package medalha.hello;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.bson.Document;
import org.json.JSONException;

import com.mongodb.client.FindIterable;

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
				
				return StreamSupport.stream(medalFound.spliterator(), false).map(Document::toJson)
						.collect(Collectors.joining(", ", "[", "]"));
			}
		});
	}
	
	public void addMedalhas() { // Cadastra medalha
		post("/add-medalha", new Route() {
			@Override
			public Object handle(final Request request, final Response response) {
				try {
					response.header("Access-Control-Allow-Origin", "*");
					String jsonString = request.body();

					Document project = Document.parse(jsonString);
					model.addMedalha(project);
					
					return project.toJson();
				} catch (JSONException ex) {
					return "erro 500 " + ex;
				}
			}
		});
	}
}
