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

    client = MongoClient(mongo_uri)
    db = client.shop_db  # My database in MongoDB Atlas
    yield db
    client.close()  

# Test to verify MongoDB connection using ping
def test_ping_mongo(db):
    assert db.client.admin.command('ping') is not None
