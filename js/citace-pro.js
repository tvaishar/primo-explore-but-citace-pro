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
	
	/* existence of individual bib data arrays in pnx must be tested, hence the ifs */
  /* data from pnx->addata */
  if (typeof vm.parentCtrl.item.pnx.addata.au !== 'undefined' || typeof vm.parentCtrl.item.pnx.addata.addau !== 'undefined') 
		{
			vm.bibData.authors='';
			if (typeof vm.parentCtrl.item.pnx.addata.au !== 'undefined') {vm.bibData.authors = vm.parentCtrl.item.pnx.addata.au.join('; ');}
			if (vm.bibData.authors && typeof vm.parentCtrl.item.pnx.addata.addau !== 'undefined') {vm.bibData.authors+="; ";}
			if (typeof vm.parentCtrl.item.pnx.addata.addau !== 'undefined') {vm.bibData.authors += vm.parentCtrl.item.pnx.addata.addau.join('; ');}
		}	
  
  /* genre dependent assignments */
  if (typeof vm.parentCtrl.item.pnx.addata.genre !== 'undefined') {vm.bibData.genre = vm.parentCtrl.item.pnx.addata.genre[0];}
  
  switch(vm.bibData.genre) {
    case 'book':
			if (typeof vm.parentCtrl.item.pnx.addata.btitle !== 'undefined') {vm.bibData.title = vm.parentCtrl.item.pnx.addata.btitle[0];}
        break;
    case 'article':
			if (typeof vm.parentCtrl.item.pnx.addata.jtitle !== 'undefined') {vm.bibData.title = vm.parentCtrl.item.pnx.addata.jtitle[0];}
			if (typeof vm.parentCtrl.item.pnx.addata.atitle !== 'undefined') {vm.bibData.atitle = vm.parentCtrl.item.pnx.addata.atitle[0];}
        break;
    
    } 
  /* universal assignments */
  if (typeof vm.parentCtrl.item.pnx.addata.date !== 'undefined') {vm.bibData.date = vm.parentCtrl.item.pnx.addata.date[0];}
  if (typeof vm.parentCtrl.item.pnx.addata.isbn !== 'undefined') {vm.bibData.isbn = vm.parentCtrl.item.pnx.addata.isbn[0];}
  if (typeof vm.parentCtrl.item.pnx.addata.eissn !== 'undefined') {vm.bibData.issn = vm.parentCtrl.item.pnx.addata.eissn[0];} 
  if (typeof vm.parentCtrl.item.pnx.addata.issn !== 'undefined') {vm.bibData.issn = vm.parentCtrl.item.pnx.addata.issn[0];} /*print issn rewrites e-issn*/
  if (typeof vm.parentCtrl.item.pnx.addata.pub !== 'undefined') {vm.bibData.publisher = vm.parentCtrl.item.pnx.addata.pub[0];}
  if (typeof vm.parentCtrl.item.pnx.addata.cop !== 'undefined') {vm.bibData.place = vm.parentCtrl.item.pnx.addata.cop[0];}
  if (typeof vm.parentCtrl.item.pnx.addata.volume !== 'undefined') {vm.bibData.volume = vm.parentCtrl.item.pnx.addata.volume[0];}
  if (typeof vm.parentCtrl.item.pnx.addata.issue !== 'undefined') {vm.bibData.issue = vm.parentCtrl.item.pnx.addata.issue[0];}
  if (typeof vm.parentCtrl.item.pnx.addata.spage !== 'undefined') {vm.bibData.spage = vm.parentCtrl.item.pnx.addata.spage[0];}
  if (typeof vm.parentCtrl.item.pnx.addata.epage !== 'undefined') {vm.bibData.epage = vm.parentCtrl.item.pnx.addata.epage[0];}
  if (typeof vm.parentCtrl.item.pnx.addata.doi !== 'undefined') {vm.bibData.doi = vm.parentCtrl.item.pnx.addata.doi[0];}
  /* data from pnx->display */
  if (typeof vm.parentCtrl.item.pnx.display.edition !== 'undefined') {vm.bibData.edition = vm.parentCtrl.item.pnx.display.edition[0];}
  if (typeof vm.parentCtrl.item.pnx.display.format !== 'undefined') {vm.bibData.pages  = vm.parentCtrl.item.pnx.display.format[0];}
	
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