odoo.define('pos_proxy_service.CFButtons', function(require) {
'use strict';
   //const { Gui } = require('point_of_sale.Gui');
   const PosComponent = require('point_of_sale.PosComponent');
   const { posbus } = require('point_of_sale.utils');
   const ProductScreen = require('point_of_sale.ProductScreen');
   const { useListener } = require('web.custom_hooks');
   const Registries = require('point_of_sale.Registries');




   class CFButtons extends PosComponent {
    constructor() {
            super(...arguments);
            useListener('click', this.onClick);
        }

        



       async onClick() {






            var listaCierres = [];

            listaCierres.push({
                'id': "1",
                'label': "Cierre X",
                'item':  "x",
            });
            listaCierres.push({
                'id': "2",
                'label': "Cierre Z",
                'item':  "z",
            });







            const { confirmed, payload: seleccioncierre } = await this.showPopup(
                'SelectionPopup',
                {
                    title: this.env._t('Select the pricelist'),
                    list: listaCierres,
                }

            );


                if (confirmed) {
                    console.info(seleccioncierre);


                    if (seleccioncierre == 'z'){
                    var con = confirm("¿Esta seguro de imprimir cierre Z?");
                    if (!con){
                        return;
                    }
                }



                var response = this.env.pos.print_pos_fiscal_close(seleccioncierre);
                }


       }
   }
    CFButtons.template = 'CFButtons';

    ProductScreen.addControlButton({
    component: CFButtons,
    condition: function() {
    return this.env.pos.config.use_fiscal_printer;
    },
    });

   Registries.Component.add(CFButtons);
   return CFButtons;
});
