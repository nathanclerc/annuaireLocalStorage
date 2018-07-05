// var data = [
// {
// 	nom: 'Clerc',
// 	prenom: 'Nathan',
// 	age: 19
// },
// {
// 	nom: 'Philippe',
// 	prenom: 'Jonathan',
// 	age: 19
// }
// ];


// var val = JSON.stringify(data);
// window.localStorage.setItem("annuaire", val);


var dataParse = JSON.parse(window.localStorage.getItem("annuaire"));
for (id in dataParse){

	var personne = dataParse[id];
	$('#tBody').append('<tr><td>' + personne.nom + '</td><td>' + personne.prenom + '</td><td>' + personne.age + '</td></tr>');
}

$('#submit').click(function (){

	var nomSet = $('#inNom').val();
	var prenomSet = $('#inPrenom').val();
	var ageSet = $('#inAge').val();

	if (nomSet === '' && prenomSet === '') {

		alert('Nom et prénom obligatoires');

	}else{
		dataParse.push({
			nom : nomSet,
			prenom : prenomSet,
			age : ageSet
		});
		var val = JSON.stringify(dataParse);
		window.localStorage.setItem("annuaire", val);
		$('#inNom').val('');
		$('#inPrenom').val('');
		$('#inAge').val('');
	}
});

$('#butRecherche').click(function(){
	cherche();
});

	function cherche(){
		var valeur = $('#inRecherche').val();
		for (id in dataParse){
			var personne = dataParse[id];
			//console.log(personne);
			if (valeur === personne.prenom) {
				console.log(personne);
				$('#tBody').empty();
				$('#inRecherche').val('');
				$('#tBody').append('<tr><td>' + personne.nom + '</td><td>' + personne.prenom + '</td><td>' + personne.age + '</td></tr>');
				return personne;
			}
		}
	};