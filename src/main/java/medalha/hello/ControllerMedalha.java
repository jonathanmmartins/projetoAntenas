package medalha.hello;

import static spark.Spark.get;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.bson.Document;

import com.mongodb.client.FindIterable;

import aluno.hello.ModelAluno;
import spark.Request;
import spark.Response;
import spark.Route;

public class ControllerMedalha {
	private ModelMedalha model;
	
	public ControllerMedalha(ModelMedalha model) {
		super();
		this.model = model;
	}
	
	public void medalhas() {
		get("/medalhas", new Route() {
			@Override
			public Object handle(final Request request, final Response response) {

				FindIterable<Document> medalFound = model.listaMedalhas();
				
				//System.out.println(medalFound);

				return StreamSupport.stream(medalFound.spliterator(), false).map(Document::toJson)
						.collect(Collectors.joining(", ", "[", "]"));
			}
		});
	}
}
