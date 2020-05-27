package medalha.hello;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class ModelMedalha {
	MongoClient mongoClient = new MongoClient( "127.0.0.1" );
	MongoDatabase db = mongoClient.getDatabase("app");
	
	public void addMedalha(Document doc) {
		MongoCollection<Document> researches = db.getCollection("medalhas");
		researches.insertOne(doc);
	}
	
	public FindIterable<Document> listaMedalhas() {
		
		MongoCollection<Document> medalhas = db.getCollection("medalhas");
		FindIterable<Document> found = medalhas.find();
		return found;
	}
}
