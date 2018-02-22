# primo-explore-but-citace-pro
_Citace PRO_ service integration

##Description
This solution replaces standard Primo bib. citation solution with [_Citace PRO_](https://www.citace.com/) service. This service is integrated via `<iframe>` element.

New solution is bound to `<prm-citation-after>`, while the original solution is hidden by css. Data from parent controller
(`<prm-citation>`) are parsed and transformed into the openURL call of _Citace PRO_ service (see [specification](https://docs.google.com/document/d/1O750bnggE5e22EU22gIP170Psa_I-YT31FjNB1VYTM0)). 

The data come mostly from `$vm.vm.parentCtrl.item.pnx.addata` and some from `$vm.vm.parentCtrl.item.pnx.display`.

The `<iframe>` is sanitized with [AngularJS SCE](https://docs.angularjs.org/api/ng/service/$sce).

Npm package available from https://www.npmjs.com/package/primo-explore-but-citace-pro. 

##Versions

###1.2.0
Working solution, that has passed tests on various record samples from Brno University of Technology catalog. 
However, specifying the crucial `genre` parameter from the data is a bit messy.
