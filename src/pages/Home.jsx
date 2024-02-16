import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  Box,
  Button,
  CardContent,
  TextField,
} from "@mui/material";

const Home = () => {
  const [symbols, setSymbols] = useState([]);

  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSymbols, setFilteredSymbols] = useState([]);

  const apiUrl = "https://finnhub.io/api/v1/stock/symbol";
  const apiKey = "cn7fsa9r01qgjtj4jbu0cn7fsa9r01qgjtj4jbug";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            exchange: "US",
            token: apiKey,
          },
        });

        const symbolData = response?.data?.slice(0, 300);

        setSymbols(symbolData);

        console.log(response?.data[0]);
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredSymbols(
      symbols.filter((symbol) =>
        symbol.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, symbols]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {error ? (
        <p>Error: {error}</p>
      ) : symbols.length > 0 ? (
        <div>
          {/* Displaying Material-UI cards with stock symbols */}
          <Typography
            style={{ fontSize: "20px", fontWeight: 700, margin: "20px" }}
          >
            Data of different companies.
          </Typography>
          <TextField
            type="text"
            placeholder="Search by symbol"
            onChange={handleSearch}
            style={{ width: "500px" }}
          />
          <Box style={{ marginTop: "20px" }}>
            {filteredSymbols.map((symbolCard, index) => (
              <Card
                key={index}
                variant="outlined"
                style={{
                  marginBottom: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                  border: "2px solid #000",
                  maxWidth: 600,
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    Stock Symbol: {symbolCard.symbol}
                  </Typography>
                  <Typography variant="h6" component="div">
                    Currency: {symbolCard.currency}
                  </Typography>
                  <Typography variant="h6" component="div">
                    Description: {symbolCard.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
