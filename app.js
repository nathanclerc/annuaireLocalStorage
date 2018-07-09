//générer l'annuaire
var dataParse = JSON.parse(window.localStorage.getItem("annuaire"));
for (id in dataParse){
	var personne = dataParse[id];

		$('#tBody').append('<tr><td class="id">'+id+'</td><td class="nom">' + personne.nom + '</td><td class="prenom">' + personne.prenom + '</td><td class="age">' + personne.age + 
			'</td><td><button class="modif btn btn-outline-success my-2 my-sm-0">Modifier</button></td>'+
			'<td><button class="suppr btn btn-outline-success my-2 my-sm-0">Supprimer</button></td></tr>');
	
}
$('.id').hide();

//ajouter une personne
$('#submit').click(function (){

	var nomSet = $('#inNom').val();
	var prenomSet = $('#inPrenom').val();
	var ageSet = $('#inAge').val();

	if (nomSet === '' || prenomSet === '') {

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


//fonction de recherche
$('#butRecherche').click(function(){
	cherche();
});

function cherche(){
	$('tbody>tr').show();
	var valeur = $('#inRecherche').val();
	$('tbody>tr').not(':contains(' + valeur + ')').hide();
};



//fonction modifier
$('.modif').click(function(){
	var ligne = $(this).closest("tr");
	var idTmp = ligne.find(".id").text();
	var nomTmp= ligne.find(".nom").text();
	var prenomTmp= ligne.find(".prenom").text();
	var ageTmp= ligne.find(".age").text();

	ligne.replaceWith('<tr><td class="id">'+idTmp+'</td><td><input class="nom" value="'+nomTmp+'"></td><td><input class="prenom" value="'+prenomTmp+'"></td><td><input class="age" value="'+ageTmp+'">'+
		'</td><td><button id="valid" class="btn btn-outline-success my-2 my-sm-0">Valider</button></td>'+
		'<td><button class="suppr btn btn-outline-success my-2 my-sm-0">Supprimer</button></td></tr>');
	$('.id').hide();


	//quand user valide ses modifs
	$('#valid').click(function envoyer(){
		var ligne = $(this).closest("tr");
		var nomMod= ligne.find(".nom").val();
		var prenomMod= ligne.find(".prenom").val();
		var ageMod= ligne.find(".age").val();

		var objetTmp = {

			nom: nomMod,
			prenom: prenomMod,
			age: ageMod

		};

		var dataParse = JSON.parse(window.localStorage.getItem("annuaire"));
		dataParse[idTmp] = Object.assign(objetTmp);

		var val = JSON.stringify(dataParse);
		window.localStorage.setItem("annuaire", val);
		location.href="index.html";
	});
});

//fonction de suppression
$('.suppr').click(function(){
	var ligne = $(this).closest("tr");
	var idTmp = ligne.find(".id").text();
	var nomTmp= ligne.find(".nom").text();
	var prenomTmp= ligne.find(".prenom").text();
	if (confirm("Voulez-vous vraiment supprimer "+nomTmp+ " " + prenomTmp+" ?")) {
		var dataParse = JSON.parse(window.localStorage.getItem("annuaire"));
		dataParse.splice(idTmp, 1);
		var val = JSON.stringify(dataParse);
		window.localStorage.setItem("annuaire", val);
		location.href="index.html";
	}
});

$('#retour').click(function(){
	location.href="index.html";
});

$('#refresh').click(function(){
	location.href="index.html";
});
