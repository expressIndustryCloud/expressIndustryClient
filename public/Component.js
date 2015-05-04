jQuery.sap.declare('exp.ind.cli.Component');
jQuery.sap.require('exp.ind.cli.MyRouter');

sap.ui.core.UIComponent.extend('exp.ind.cli.Component', {
    metadata: {
        name: 'express industry client',
        version: '0.0.1',
        includes: [],
        dependencies: {
            libs: ['sap.m', 'sap.ui.layout'],
            components: []
        },
        rootView: 'exp.ind.cli.view.App',
        config: {
            resourceBundle: 'i18n/messageBundle.properties',
            serviceConfig: {
                name: 'expressIndustryCloud',
                serviceUrl: 'https://s9hanaxs.hanatrial.ondemand.com/p1940208753trial/myhana/expressindustrycloud/services/express_order.xsodata'
            }
        },
        routing: {
            config: {
                routerClass: exp.ind.cli.MyRouter,
                viewType: 'XML',
                viewPath: 'exp.ind.cli.view',
                targetAggregation: 'detailPages',
                clearTarget: false
            },
            routes: [{
                pattern: '',
                name: 'main',
                view: 'Master',
                targetAggregation: 'masterPages',
                targetControl: 'idAppControl',
                subroutes: [{
                    pattern: '{product}/:tab:',
                    name: 'product',
                    view: 'Detail'
                }]
            }, {
                name: 'catchallMaster',
                view: 'Master',
                targetAggregation: 'masterPages',
                targetControl: 'idAppControl',
                subroutes: [{
                    pattern: ':all*:',
                    name: 'catchallDetail',
                    view: 'NotFound'
                }]
            }]
        }
    },


    init: function() {

        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

        var mConfig = this.getMetadata().getConfig();

        // always use absolute paths relative to our own component
        // (relative paths will fail if running in the Fiori Launchpad)
        var rootPath = jQuery.sap.getModulePath('exp.ind.cli');

        // set i18n model
        var i18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl: [rootPath, mConfig.resourceBundle].join('/')
        });
        this.setModel(i18nModel, 'i18n');

        // Create and set domain model to the component
        // var sServiceUrl = mConfig.serviceConfig.serviceUrl;
        // var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
        // this.setModel(oModel);

        // sdfdf
        new sap.ui.core.util.MockServer('mockserver', {
            rootUri: rootPath + '/model/metadata.xml'
        });

        // set device model
        var deviceModel = new sap.ui.model.json.JSONModel({
            isTouch: sap.ui.Device.support.touch,
            isNoTouch: !sap.ui.Device.support.touch,
            isPhone: sap.ui.Device.system.phone,
            isNoPhone: !sap.ui.Device.system.phone,
            listMode: sap.ui.Device.system.phone ? 'None' : 'SingleSelectMaster',
            listItemType: sap.ui.Device.system.phone ? 'Active' : 'Inactive'
        });
        deviceModel.setDefaultBindingMode('OneWay');
        this.setModel(deviceModel, 'device');

        this.getRouter().initialize();
    }
});
