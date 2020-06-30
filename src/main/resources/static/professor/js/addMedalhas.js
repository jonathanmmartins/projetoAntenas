let emailSessão = sessionStorage.getItem("sess_email_professor");

var testeAluno = new Boolean(false);

function add_medalha(){
	let rotaAlunos = "/listarAlunos";
	alu_email = document.getElementById('emailAluno_').value;

	$.get(rotaAlunos, function (rotaAlu, err) {	
		let alunos = JSON.parse(rotaAlu);
		for (i = 0; i < alunos.length; i++) {
			if (alunos[i].email==alu_email) {
				testeAluno=true;
			}
		}
		insereDados();	
	});

	

	
}

function insereDados(){
	if(testeAluno==true){
		let formNewProject = $('[medalha_add]');
		let inputsData = formNewProject.serializeArray();
		
		let project = {
			nameMedal: '',
			email_aluno: '',
			nivel:'',
			email_professor: emailSessão
		};
		
		inputsData.forEach(input => {
			project[input.name] = input.value; 
		});
	
		$.ajax({
			type: "POST",
			url: '/add-medalha',
			data: JSON.stringify(project),
			success: function() {
			location.reload();
			},
			dataType: 'json'
		});
		alert("Medalha cadastrada com sucesso")
	}else{
		alert("Problema no cadastro da medalha - Aluno Inválido")
	}
	  testeAluno=false;
}
