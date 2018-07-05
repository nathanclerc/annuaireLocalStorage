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
	$('#tBody').append('<tr><td class="nom">' + personne.nom + '</td><td class="prenom">' + personne.prenom + '</td><td class="age">' + personne.age + 
		'</td><td><button class="id btn btn-outline-success my-2 my-sm-0">Modifier</button></td>'+
		'<td><button class="suppr btn btn-outline-success my-2 my-sm-0">Supprimer</button></td></tr>');
}

$('#submit').click(function (){

	var nomSet = $('#inNom').val();
	var prenomSet = $('#inPrenom').val();
	var ageSet = $('#inAge').val();

	if (nomSet === '' && prenomSet === '') {

		alert('Nom et prénom obligatoires');

	}else{
		var dataParse = JSON.parse(window.localStorage.getItem("annuaire"));
		if (dataParse == null) {
			var dataParse = [];
			alert('Premier ajout fait');
		}
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
	$('tbody>tr').show();
	var valeur = $('#inRecherche').val();
	if (valeur === '') {
		$('tbody>tr').show();
	}
	$('tbody>tr').not(':contains(' + valeur + ')').hide();
	// for (id in dataParse){
	// 	var personne = dataParse[id];
	// 	var trouver = $.contains(dataParse, valeur);
	// 	if (trouver === true) {
	// 		console.log(personne);
	// 		$('#tBody').empty();
	// 		$('#inRecherche').val('');
	// 		$('#tBody').append('<tr><td>' + personne.nom + '</td><td>' + personne.prenom + '</td><td>' + personne.age + '</td></tr>');
	// 		return personne;
	// 	}
	// }
};

$('.id').click(function(){
	var ligne = $(this).closest("tr");
	var nomTmp= ligne.find(".nom").text();
	var prenomTmp= ligne.find(".prenom").text();
	var ageTmp= ligne.find(".age").text();
	var objetTmp = {
		nom: nomTmp,
		prenom: prenomTmp,
		age: ageTmp
	};
	var val = JSON.stringify(objetTmp);
	window.localStorage.setItem("temp", val);
	objetTmp = JSON.parse(window.localStorage.getItem("temp"));
	console.log(objetTmp);
	ligne.replaceWith('<tr><td><input class="nom" value="'+nomTmp+'"></td><td><input class="prenom" value="'+prenomTmp+'"></td><td><input class="age" value="'+ageTmp+'">'+
		'</td><td><button id="valid" class="btn btn-outline-success my-2 my-sm-0">Valider</button></td>'+
		'<td><button class="suppr btn btn-outline-success my-2 my-sm-0">Supprimer</button></td></tr>');
	$('#valid').click(function envoyer(){
		var ligne = $(this).closest("tr");
		var nomMod= ligne.find(".nom").val();
		var prenomMod= ligne.find(".prenom").val();
		var ageMod= ligne.find(".age").val();

		var dataParse = JSON.parse(window.localStorage.getItem("annuaire"));
		for (id in dataParse){
			var personne = dataParse[id];
			var tempo = Object.is(personne, objetTmp);
				console.log(tempo);
			if (personne == objetTmp) {
				alert('ok');
				delete personne;
			}
		}
		// dataParse.push({
		// 	nom : nomMod,
		// 	prenom : prenomMod,
		// 	age : ageMod
		// });
		// var val = JSON.stringify(dataParse);
		// window.localStorage.setItem("annuaire", val);
		//location.href="index.html";
	});
});


$('.suppr').click(function(){

});

$('#retour').click(function(){
	location.href="index.html";
});
$('#refresh').click(function(){
	location.href="index.html";
});
