# Import the necessary modules for testing
import pytest
from app import app  # Importing the Flask application instance

# Fixture to set up the Flask test client
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

# Test invalid HTTP method for the '/products' route
def test_invalid_method(client):
    # Test for an invalid HTTP method on the '/products' route.
    response = client.post('/products')  # Route expects GET, sending POST.
    assert response.status_code == 405  # Method Not Allowed