 
 
 
 $(document).ready(function () {
         var Next;
         var Previous;
         TotalPokemones();

 })


 function next() {
         TotalPokemones(Next);
 }

 function previous() {
         TotalPokemones(Previous);
 }

 function TotalPokemones(url) {
         $('.row').html('');
         if (!url) {
                 url = 'https://pokeapi.co/api/v2/pokemon';
         }
         $.get(url, data => {
                 Next = data.next
                 Previous = data.previous
                 console.log(Next, Previous)


                 data.results.forEach(pokemones => {
                         $.get(pokemones.url, dataPokemon => {
                                 let imgFront = dataPokemon.sprites.front_default;
                                 let imgBack = dataPokemon.sprites.back_default;
                                 let stats = dataPokemon.stats;

                                 $('.row').append(

                                         '<div class="card col-2">' +
                                         '<div class = "flip-box">' +
                                         '<div class = "flip-box-inner">' +
                                         '<div class = "flip-box-front">' +
                                         '<img class="card-img-top" id="Imagen" src="' + imgFront + '" alt="Card image cap">' +
                                         '</div>' +
                                         '<div class = "flip-box-back">' +
                                         '<img class="card-img-top" id="Imagen" src="' + imgBack + '" alt="Card image cap">' +
                                         '</div>' +
                                         '</div>' +
                                         '</div>' +
                                         '<div class="card-body">' +
                                         '<h5 class="card-title" id="Nombre"> ' + pokemones.name + ' </h5>' +
                                         '<button onclick="Graficar(' + stats[0].base_stat + ',' + stats[3].base_stat + ',' + stats[0].base_stat + ',' + stats[0].base_stat + ')" type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal">' +
                                         'Grafico' +
                                         '</button>' +
                                         '</div>' +
                                         '</div>'
                                 )
                         })
                 });
         })
 }

 $(document).ready(function () {
        cargarPokemones();
        $(".pokemon__nombre").hide();
});

function cargarPokemones() {
        $.get("https://pokeapi.co/api/v2/pokemon", function (data) {
                console.log(data);
        });
}
$("#search__button").onclick(function (e) {
        e.preventDefault();
        var cargar = $("#search__input")[0].value;
        if (cargar == "") {
                alert("Debe ingresar nombre de Pokemon correcto");
        } else {
                nombrePokemon(cargar);
        }

        function nombrePokemon(id) {
                $.get("https://pokeapi.co/api/v2/pokemon") + id,
                        function (data) {
                                console.log(data);
                                $(".pokemon__nombre").show()

                        }
        }
});

 


 function Graficar(speed, defense, attack, hp) {
         var chart = new CanvasJS.Chart("chartContainer", {
                 animationEnabled: true,
                 theme: "dark1",
                 title: {
                         text: "Caracteristicas pokemones"
                 },
                 axisY: {
                         title: " Valores(%)",
                         suffix: "%",
                         includeZero: false
                 },
                 axisX: {
                         title: "Caracteristicas"
                 },
                 data: [{
                         type: "column",
                         yValueFormatString: "#,##0.0#\"%\"",
                         dataPoints: [{
                                         label: "Velocidad",
                                         y: speed
                                 },
                                 {
                                         label: "Defensa",
                                         y: defense
                                 },
                                 {
                                         label: "Ataque",
                                         y: attack
                                 },
                                 {
                                         label: "Puntos de Vida",
                                         y: hp
                                 },


                         ]
                 }]
         });
         chart.render();

 }