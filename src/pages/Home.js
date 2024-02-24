import React, { useEffect, useState } from 'react';
import { db } from "../firebase";
import { Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { Box, Center, ChakraProvider } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import './Card.css'

const Home = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, "items"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        // Convert Price and Quantity from strings to numbers
        const itemData = {
          id: doc.id,
          Name: doc.data().Name,
          Price: parseFloat(doc.data().Price),
          Quantity: parseInt(doc.data().Quantity),
          Description: doc.data().Description,
          img: doc.data().img
        };
        list.push(itemData);
      });
      setItems(list);
      setLoading(false);
    }, (error) => {
      console.log(error)
    }
    );
    return () => {
      unsub();
    }
  }, []);

  return (
    <ChakraProvider>
      <Box height="20vh" bg="beige">
      {/* <b><p className='inverted'>"</p></b> */}
      <Center h="33%" bg="beige" margin={0} padding={0}>
          <b>
            <p className='tagline'>"YOUR PROFIT IS OUR PROMISE</p>
          </b>
        </Center>
        
      </Box>
    
    {/* <Container>
  
      <div className="main">
        <div className="dropdown">
          {/* Dropdown menu }
          <select className='category'>
            <option value="option1">All</option>
            <option value="option2">T-Shirts</option>
            <option value="option3">Shirts</option>
          </select>
          <h4 className='label'>Sort By: </h4>
          <select className='sortby'>
            <option value="option1">Date</option>
            <option value="option2">Size</option>
            <option value="option3">Name</option>
          </select>
          <input className='search_box' type="text" placeholder='Search the Store' />

          {/* Call handleAddCard function on button click }
          <button className="add_item" onClick={() => navigate("./add")}>
            Add Items
          </button>
        </div>
      </div>

      {/* Add margin between filter/search and product cards}
      <div style={{ marginTop: '40px' }}>
        <Card.Group>
          <Grid columns={3} stackable>
            {items &&
              items.map((item) => (
                <Grid.Column className='grid-column' key={item.id}>
                  <Card fluid>
                    <Image className='card-image' src={item.img} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{item.Name}</Card.Header>
                      <Card.Meta>Price: ${item.Price}</Card.Meta>
                      <Card.Meta>Quantity: {item.Quantity}</Card.Meta>
                      <Card.Description>{item.Description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div>
                        <Button
                          color='green'
                          onClick={() => navigate(`/update/${item.id}`)}
                        >
                          Update
                        </Button>
                        <Button color='purple'>View</Button>
                      </div>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
          </Grid>
        </Card.Group>
      </div>
    </Container>
    </ChakraProvider> */}
    <Box
      width="100%"
      height="100%"
      borderTop="2px groove"
      borderRadius="2rem"
      // boxShadow="0 8px 18px rgba(0, 0, 0, 0.1)"
      // transition="box-shadow 0.3s ease"
    >
      <Flex className="dropdown">
        <Select className="category" placeholder="Category">
          {/* Options */}
        </Select>
        <Select className="sortby" placeholder="Sort By">
          {/* Options */}
        </Select>
      </Flex>
      <Flex className="label">
        <Input
          className="search_box"
          type="text"
          placeholder="Search"
          borderRadius="10px"
        />
        <Button className="add_item" marginLeft="1rem">
          Add Item
        </Button>
      </Flex>
      <Flex className="card-container">
        {/* Individual Card Components */}
      </Flex>
    </Box>
    </ChakraProvider>
  );
};

export default Home