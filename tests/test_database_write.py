import pytest
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load the .env file from the project root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# Print environment variables to verify they are loaded correctly
print("MONGODB_USERNAME:", os.getenv('MONGODB_USERNAME'))
print("MONGODB_PASSWORD:", os.getenv('MONGODB_PASSWORD'))
print("MONGODB_CLUSTER:", os.getenv('MONGODB_CLUSTER'))

# Fixture to establish a database connection
@pytest.fixture
def db():
    # Establish the MongoDB connection using environment variables
    mongo_uri = f"mongodb+srv://{os.getenv('MONGODB_USERNAME')}:{os.getenv('MONGODB_PASSWORD')}@{os.getenv('MONGODB_CLUSTER')}/?retryWrites=true&w=majority"
    print(f"Mongo URI: {mongo_uri}")  # Print the connection URI to verify

    # Create MongoClient and connect to the database
    client = MongoClient(mongo_uri)
    db = client.shop_db  # My database in MongoDB Atlas
    yield db
    client.close()  

# Test to verify MongoDB write operation to 'products' collection
def test_write_data_to_db(db):
    # Define the 'products' collection
    products_collection = db.products  # Using the 'products' collection

    # Create a new product document to insert
    new_product = {"name": "Test Product", "price": 20.99, "tag": "electronics"}

    # Insert the new product document into the 'products' collection
    result = products_collection.insert_one(new_product)

    # Ensure that the document was inserted successfully
    assert result.inserted_id is not None  # Ensure the insertion was successful

    # Query the 'products' collection to retrieve the inserted document
    inserted_product = products_collection.find_one({"name": "Test Product"})

    # Ensure the document is found
    assert inserted_product is not None  # The inserted document should exist

    # Check the inserted data to ensure it matches the original data
    assert inserted_product['name'] == 'Test Product'  # Ensure the 'name' matches
    assert inserted_product['price'] == 20.99  # Ensure the 'price' matches
    assert inserted_product['tag'] == 'electronics'  # Ensure the 'tag' matches
