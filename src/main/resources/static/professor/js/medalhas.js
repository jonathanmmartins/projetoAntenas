let tbody = $('[data-myProjects-table-body2]')
let rota = "/listarAlunos"
let rota2 = "/medalhas"

$(document).ready(function () {
  

  $.get(rota, function (todosAlunos, err) {
		let listaAlunos = JSON.parse(todosAlunos);
		console.log(listaAlunos);
    	//alert(listaAlunos);

		listaAlunos.forEach(alunos => {
			let id_aluno = alunos._id.$oid;
			let novoHTML = $.parseHTML(
				`<tr> <th>${alunos.name}</th>
				<th> ${alunos.email} </th>
				<th id="buttonMedal-${id_aluno}"></th>
				</tr>
			`);

			tbody.append(novoHTML);
			
			let buttonDetalhes = $.parseHTML(
				`<button type="button" class="btn btn-success" data-toggle="modal" data-target="#btn-medalhas">
					Detalhes
				</button>`);

			let $buttonDetalhes = $(buttonDetalhes);	

			$buttonDetalhes.click(function(e){
				e.preventDefault();
				_medalhasAlunos(alunos)
			  });

			$('#buttonMedal-'+id_aluno).append(buttonDetalhes);

		});


		
	});





});	

function _medalhasAlunos(alunos){
	
	let popupMedalhas =  $.parseHTML(`
	  <div class="modal fade" id="btn-medalhas" tabindex="-1" role="dialog" aria-labelledby="btn-medalhas" aria-hidden="true">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title" id="exampleModalLabel">Medalhas - ${alunos.name}</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
			  <span aria-hidden="true">&times;</span>
			</button>
		  </div>
		  <div class="modal-body" >
			<div id="alunos1" class="container"><br>
			<table class="table">
				<thead class="thead-dark">
					<tr>
					<td scope="col">Nome</td>
					<td scope="col">Nível</td>
					<td scope="col">Professor</td>
						<td></td>
					</tr>
				</thead>
				<tbody id="MedalDetalhes">
  
				</tbody>
			</table>
		</div>
		  </div>
		  <div class="modal-footer" >
		  
		  </div>
	  </div>
	</div>`);
	/* Evento insere modal no HTML */
	
  
	$.get(rota2, function (medalBE, err) {	

		let medal = JSON.parse(medalBE);
		let wichParticipate = [];
		for (i = 0; i < medal.length; i++) {
			if (medal[i].email_aluno==alunos.email) {
				wichParticipate.push(i);
			}
		}
		if (wichParticipate) {
			wichParticipate.map((index) => {
				console.log(index);
				var $tela = document.querySelector('#MedalDetalhes'),
					HTMLTemporario = $tela.innerHTML,
					HTMLNovo = "<tr> <td>" + medal[index].nameMedal + "</td>"
						+ "<td>" + medal[index].nivel + "</td>" 
						+ "<td>"+ medal[index].email_professor + "</td>"
						+ "</tr>";
				HTMLTemporario = HTMLTemporario + HTMLNovo;
				$tela.innerHTML = HTMLTemporario;
			});
		}
	});

	$(tbody).prepend(popupMedalhas);
	/* Evento Remove modal do HTML */
	$('.close').click(function(e){
	  e.preventDefault();
	  $(".modal-backdrop ").remove();
	});
  
	/*project.alunos.forEach(aluno => {
	  let remover = project.alunos.indexOf(aluno)
	  let td =  $.parseHTML(`<tr data-alunos-item="${aluno}> 
			  <th scope="row">${aluno}</th>
				  <td>${aluno}</td>
				  <td btn-remove-al-${remover}></td>
			  </tr>
			`);
  
	  let btn_remove = $.parseHTML(`<button type="button" class="btn btn-danger">Remover</button>`);
	  let $btn_remove = $(btn_remove);
	  $btn_remove.click(function(e){
		 project.alunos.splice(remover, 1);
		  $.post("/updateProjetoProfessor", JSON.stringify({'_id':project._id, 'alunos': project.alunos}), "json");
		  $(this).closest('tr').remove();
	  });
  
	  $('[td_body_aluno]').append(td);
	  $('[btn-remove-al-'+remover+']').append(btn_remove);
	});*/
  }