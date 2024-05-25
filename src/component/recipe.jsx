import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export const RecipeFinder = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    cuisine: '',
    diet: '',
    intolerances: '',
  });
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=e94e58f24d93434fa14e17801894c50a&query=${searchTerm}&cuisine=${filters.cuisine}&diet=${filters.diet}&intolerances=${filters.intolerances}`
        );
        const data = await response.json();
        setRecipes(data.results);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [searchTerm, filters]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFavorite = (recipe) => {
    const isFavorite = favorites.some((favorite) => favorite.id === recipe.id);
    if (isFavorite) {
      setFavorites(favorites.filter((favorite) => favorite.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <Container className="my-5">
      <header className="mb-4">
        <h1 className="text-center mb-2" style={{ color: '#ff6b6b' }}>
          Recipe Finder
        </h1>
        <p className="text-center">Discover delicious recipes and save your favorites</p>
      </header>

      <Form className="mb-4">
        <Row>

          <Col md={6} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search for recipes..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ backgroundColor: '#f2f2f2', border: 'none' }}
            />
          </Col>

          <Col md={2} className="mb-3">
            <Form.Select
              name="cuisine"
              value={filters.cuisine}
              onChange={handleFilters}
              style={{ backgroundColor: '#f2f2f2', border: 'none' }}
            >
              <option value="">Cuisine</option>
              <option value="italian">Italian</option>
              <option value="mexican">Mexican</option>
              <option value="asian">Asian</option>
            </Form.Select>
          </Col>

          <Col md={2} className="mb-3">
            <Form.Select
              name="diet"
              value={filters.diet}
              onChange={handleFilters}
              style={{ backgroundColor: '#f2f2f2', border: 'none' }}
            >
              <option value="">Diet</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-Free</option>
            </Form.Select>
          </Col>
          
          <Col md={2} className="mb-3">
            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: '#ff6b6b', border: 'none' }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {recipes.map((recipe) => (
            <Col key={recipe.id} md={4} className="mb-4">
              <Card
                style={{
                  backgroundColor: '#f2f2f2',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Card.Img variant="top" src={recipe.image} />
                <Card.Body>
                  <Card.Title style={{ color: '#ff6b6b' }}>
                    {recipe.title}
                    <Button
                      variant="link"
                      style={{ padding: 0, marginLeft: '0.5rem' }}
                      onClick={() => handleFavorite(recipe)}
                    >
                      {favorites.some((favorite) => favorite.id === recipe.id) ? (
                        <FaHeart style={{ color: '#ff6b6b' }} />
                      ) : (
                        <FaRegHeart style={{ color: '#ff6b6b' }} />
                      )}
                    </Button>
                  </Card.Title>
                  <Card.Text>{recipe.readyInMinutes} minutes</Card.Text>
                  <Button
                    variant="primary"
                    href={`https://www.spoonacular.com/recipes/${recipe.id}-${recipe.title.replace(/\s+/g, '-')}`}
                    style={{
                      backgroundColor: '#ff6b6b',
                      border: 'none',
                      marginTop: '1rem',
                    }}
                  >
                    View Recipe
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {favorites.length > 0 && (
        <div className="my-5">
          <h2 className="text-center mb-4" style={{ color: '#ff6b6b' }}>
            Your Favorites
          </h2>
          <Row>
            {favorites.map((favorite) => (
              <Col key={favorite.id} md={4} className="mb-4">
                <Card
                  style={{
                    backgroundColor: '#f2f2f2',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Card.Img variant="top" src={favorite.image} />
                  <Card.Body>
                    <Card.Title style={{ color: '#ff6b6b' }}>{favorite.title}</Card.Title>
                    <Card.Text>{favorite.readyInMinutes} minutes</Card.Text>
                    <Button
                      variant="primary"
                      href={`https://www.spoonacular.com/recipes/${favorite.id}-${favorite.title.replace(/\s+/g, '-')}`}
                      style={{
                        backgroundColor: '#ff6b6b',
                        border: 'none',
                        marginTop: '1rem',
                      }}
                    >
                      View Recipe
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};