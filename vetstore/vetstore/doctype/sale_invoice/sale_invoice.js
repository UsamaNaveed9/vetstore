// Copyright (c) 2021, Usama and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sale Invoice', {
	setup:function(frm){
        //set total Amount
        frm.compute_total_amount = function(frm){
            let total_amount = 0;
            frm.doc.items.forEach(d=>{
                total_amount = total_amount + d.amount;
            });
            frm.set_value('total_amount',total_amount);
            //console.log(total)
        }
		//set total gross amount
		frm.compute_total_gross_amount = function(frm){
			let total_gross = 0;
			frm.doc.items.forEach(d=>{
				total_gross = total_gross + d.gross_amount;
			});
			frm.set_value('total_gross_amount',total_gross);
			frm.set_value('grand_total', total_gross);
		}
		// set total discount amount
		frm.compute_total_discount_amount = function(frm){
			let total_discount = 0;
			frm.doc.items.forEach(d=>{
				total_discount = total_discount + d.discount_amount;
			});
			frm.set_value('total_discount_amount', total_discount);
		}
		// set total quantity
		frm.compute_total_quantity = function(frm){
			let total_quantity = 0;
			frm.doc.items.forEach(d=>{
				total_quantity = total_quantity + d.quantity;
			})
			frm.set_value('total_quantity', total_quantity);
		}
    },
	received_amount:function(frm){
		frm.set_value('remaining_amount', frm.doc.grand_total-frm.doc.received_amount);
	}
});

frappe.ui.form.on('Sale Invoice Item',{
	quantity:function(frm,cdt,cdn){
		//grab the row
		let row = locals[cdt][cdn];
		if(row.quantity){
			frappe.model.set_value(cdt,cdn, 'amount', row.rate*row.quantity);
			frappe.model.set_value(cdt,cdn, 'gross_amount', row.amount)
		}
		if(row.amount){
			frm.compute_total_amount(frm);
			frm.compute_total_gross_amount(frm);
		}
		if(row.quantity){
			frm.compute_total_quantity(frm);
		}	
	},
	discount_amount:function(frm,cdt,cdn){
		let row = locals[cdt][cdn];
		if(row.discount_amount){
			frappe.model.set_value(cdt,cdn, 'gross_amount', row.amount-row.discount_amount);
		}
		if(row.discount_amount){
			frm.compute_total_discount_amount(frm);
		}
		frm.compute_total_gross_amount(frm);
	},
	items_remove:function(frm,cdt,cdn){
		frm.compute_total_quantity(frm);
		frm.compute_total_amount(frm);
		frm.compute_total_discount_amount(frm);
		frm.compute_total_gross_amount(frm);
	}
});
