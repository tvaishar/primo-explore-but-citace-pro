/*
*  Citace PRO (via citace.lib.vutbr.cz) integration
*
*/

app.controller ('prmCitationAfterController', ['angularLoad', function (angularLoad) {
	
	var vm = this;
	
	vm.citacelink = '';
	
	vm.author=vm.parentCtrl.item.pnx.addata.au[0];
	vm.title=vm.parentCtrl.item.pnx.addata.btitle[0];
	
	console.log(vm.author,vm.title);


}]);



app.component('prmCitationAfter', {
		bindings: {parentCtrl: '<'},
		controller: 'prmCitationAfterController',
        template: `<div class="citace-pro"><span>Zde bude iframe citace PRO. Zatím náhled dat:</span>
		<ul>
			<li>{{$ctrl.author}}</li>
			<li>{{$ctrl.title}}</li>
		</ul>
		</div>`
 });

/* Citace PRO end */