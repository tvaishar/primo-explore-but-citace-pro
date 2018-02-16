/*
*  Citace PRO (via citace.lib.vutbr.cz) integration
*
*/

app.controller ('prmCitationAfterController', ['angularLoad', function (angularLoad) {
	
	var cont = this;
	
	cont.citacelink = '';
	
	cont.author=cont.parentCtlr.item.pnx.addata.au[0];
	cont.title=cont.parentCtlr.item.pnx.addata.btitle[0];


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

