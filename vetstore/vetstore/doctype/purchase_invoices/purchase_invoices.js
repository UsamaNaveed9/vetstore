// Copyright (c) 2021, Usama and contributors
// For license information, please see license.txt

frappe.ui.form.on('Purchase Invoices', {
	setup:function(frm){
        //set total Amount
        frm.compute_total_amount = function(frm){
            let total_amount = 0;
            frm.doc.items.forEach(d=>{
                total_amount = total_amount + d.amount;
            });
            frm.set_value('total_amount',total_amount);
            frm.set_value('grand_total', total_amount);
        }
		// set total quantity
		frm.compute_total_quantity = function(frm){
			let total_quantity = 0;
			frm.doc.items.forEach(d=>{
				total_quantity = total_quantity + d.quantity;
			})
			frm.set_value('total_quantity', total_quantity);
		}
    }
});

frappe.ui.form.on('Purchase Invoice Items',{
	quantity:function(frm,cdt,cdn){
		//grab the row
		let row = locals[cdt][cdn];
		if(row.quantity){
			frappe.model.set_value(cdt,cdn, 'amount', row.rate*row.quantity);
		}
		if(row.amount){
			frm.compute_total_amount(frm);
		}
		if(row.quantity){
			frm.compute_total_quantity(frm);
		}	
	},
	items_remove:function(frm,cdt,cdn){
		frm.compute_total_quantity(frm);
		frm.compute_total_amount(frm);
	}
});
