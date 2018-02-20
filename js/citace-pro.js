/*
*  Citace PRO (via citace.lib.vutbr.cz) integration
*
*/

app.controller ('prmCitationAfterController', ['angularLoad','$sce', function (angularLoad,$sce) {
	
	var vm = this;
	
	vm.bibData={};
	
	/* your citace PRO service URL */
	vm.service='https://citace.lib.vutbr.cz/sfx';
	
	/* citace for primo specification */
    vm.bibData.citacepro_display = 'bibliography';
    vm.bibData.sid = '420BUT:PRIMO';
	
	/* data from pnx->addata */
	vm.bibData.authors = vm.parentCtrl.item.pnx.addata.au[0];
    if (vm.parentCtrl.item.pnx.addata.addau) {vm.bibData.authors=vm.bibData.authors+ "; " + vm.parentCtrl.item.pnx.addata.addau.join('; ');}
	vm.bibData.title=vm.parentCtrl.item.pnx.addata.btitle[0];
	vm.bibData.date=vm.parentCtrl.item.pnx.addata.date[0];
	vm.bibData.genre=vm.parentCtrl.item.pnx.addata.genre[0];
	vm.bibData.isbn=vm.parentCtrl.item.pnx.addata.isbn[0];
	vm.bibData.publisher=vm.parentCtrl.item.pnx.addata.pub[0];
	vm.bibData.place=vm.parentCtrl.item.pnx.addata.cop[0];
	/* data from pnx->display */
	vm.bibData.edition=vm.parentCtrl.item.pnx.display.edition[0];
	vm.bibData.pages=vm.parentCtrl.item.pnx.display.format[0];
	
	/* OpenURL serialization */
	
	vm.openUrl=vm.service+"?"+Object.entries(vm.bibData).map(function(couple){return encodeURIComponent(couple[0])+"="+encodeURIComponent(couple[1]);}).join("&");
	
	vm.trustedUrl=$sce.trustAsResourceUrl(vm.openUrl);
	console.log(vm.openUrl);
	


}]);


app.component('prmCitationAfter', {
		bindings: {parentCtrl: '<'},
		controller: 'prmCitationAfterController',
        template: `<div class="citace-pro">
		<iframe ng-src="{{$ctrl.trustedUrl}}"/>
		</div>`
 });

/* Citace PRO end */