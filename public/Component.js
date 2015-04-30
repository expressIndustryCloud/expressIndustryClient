jQuery.sap.declare("exp.ind.cli.Component");
jQuery.sap.require("exp.ind.cli.MyRouter");

sap.ui.core.UIComponent.extend("exp.ind.cli.Component", {


    metadata: {
        name: "express industry client",
        version: "0.0.1",
        includes: [],
        dependencies: {
            libs: ["sap.m", "sap.ui.layout"],
            components: []
        },
        rootView: "exp.ind.cli.view.App",
        config: {
            resourceBundle: "i18n/messageBundle.properties",
            serviceConfig: {
                name: "Northwind",
                serviceUrl: "http://services.odata.org/V2/(S(sapuidemotdg))/OData/OData.svc/"
            }
        }
    }
});
