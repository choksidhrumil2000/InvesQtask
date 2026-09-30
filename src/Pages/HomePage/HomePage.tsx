import { useEffect, useState } from "react";

import {
  Box,
  Chip,
  Container,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import Header from "../../Components/Header/Header";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import CartDrawer from "../../Components/CartDrawer/CartDrawer";

import { type ProductCategory, type Product } from "../../Types/Product";

import type { CartItem } from "../../Types/Cart";
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "../../services/ProductService";
import { useSnackbar } from "notistack";
import useDebounce from "../../Hooks/useDebounce";

function HomePage() {
  const { enqueueSnackbar } = useSnackbar();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [cartCount, setCartCount] = useState<number>(0);

  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const debounceSearch = useDebounce(search, 500);

  const [category, setCategory] = useState<string>("All");

  const [categories, setCategories] = useState<ProductCategory[]>([]);

  const [sort, setSort] = useState<string>("featured");

  useEffect(() => {
    const productFetchFunction = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const originalProducts: Product[] = await fetchProducts();
        console.log(originalProducts);

        setProducts(originalProducts);
        setFilteredProducts(originalProducts);
        setFeaturedProducts(originalProducts);
        enqueueSnackbar("Products fetched successfully", {
          variant: "success",
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        enqueueSnackbar("Error fetching products", { variant: "error" });
      }
      setIsLoading(false);
    };
    const categoriesSetup = async (): Promise<void> => {
      setIsCategoryLoading(true);
      try {
        const categories: ProductCategory[] = await fetchCategories();
        console.log(categories);
        setCategories([{ slug: "All", name: "All", url: "" }, ...categories]);
        enqueueSnackbar("Categories fetched successfully", {
          variant: "success",
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
        enqueueSnackbar("Error fetching categories", { variant: "error" });
      }
      setIsCategoryLoading(false);
    };
    const fetchCartItemsFromLocalStorage = (): void => {
      const storedCartItems = localStorage.getItem("cartItems");
      const storedCartCount = localStorage.getItem("cartCount");
      if (storedCartItems && storedCartCount) {
        setCartItems(JSON.parse(storedCartItems));
        setCartCount(parseInt(storedCartCount));
      } else if (!storedCartCount) {
        setCartCount(0);
      }
    };
    productFetchFunction();
    categoriesSetup();
    fetchCartItemsFromLocalStorage();
  }, []);

  const addToCart = (product: Product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        const updatedItems = current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      }

      const newItems = [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      return newItems;
    });
  };

  const increaseQuantity = (id: number) => {
    setCartItems((current) => {
      const updatedItems = current.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((current) => {
      const updatedItems = current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((current) => {
      const updatedItems = current.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const filterProducts = async (): Promise<void> => {
    let result: Product[] = featuredProducts;

    if (category !== "All") {
      const productsByCategory: Product[] =
        await fetchProductsByCategory(category);
      console.log("Products by category:", productsByCategory);
      result = [...productsByCategory];
      setFeaturedProducts(productsByCategory);
    } else if (category === "All") {
      result = [...products];
    }

    if (debounceSearch !== "") {
      result = result.filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(debounceSearch.toLowerCase());
        if (matchesSearch) {
          return true;
        } else {
          return false;
        }
      });
    }

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    console.log("After Sort:", result);

    console.log("Filtered Products:", result);
    setFilteredProducts(result);
  };

  useEffect(() => {
    const dummyfn = async () => {
      await filterProducts();
    };
    dummyfn();
  }, [debounceSearch, category, sort]);

  const changeCartCount = () => {
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
    localStorage.setItem("cartCount", JSON.stringify(cartCount));
  };
  useEffect(() => {
    if (cartItems.length !== 0) {
      changeCartCount();
    } else {
      setCartCount(0);
    }
  }, [cartItems]);

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 2, md: 4 },
        }}
      >
        {/* Search + Filters */}

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <TextField
            fullWidth
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          {isCategoryLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={30} />
            </Box>
          ) : (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                overflowX: "auto",
                pb: { xs: 0.5, md: 0 },
              }}
            >
              {categories.length === 0 ? (
                <Box
                  sx={{
                    border: "1px solid black",
                    padding: "1rem",
                    width: "100%",
                  }}
                >
                  <Stack
                    direction="column"
                    sx={{ justifyContent: "center", alignItems: "center" }}
                    spacing={2}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      No Filter Categories found
                    </Typography>
                  </Stack>
                </Box>
              ) : (
                categories.map((item, i) => (
                  <Chip
                    key={item.slug + `${i + 1}`}
                    label={item.name}
                    clickable
                    color={category === item.name ? "primary" : "default"}
                    variant={category === item.name ? "filled" : "outlined"}
                    onClick={() => setCategory(item.name)}
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  />
                ))
              )}
              {}
            </Stack>
          )}
        </Stack>

        {/* Heading */}

        <Stack
          direction="row"
          spacing={2}
          sx={{
            mb: 2.5,
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
              }}
            >
              All Products
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {filteredProducts.length} products
            </Typography>
          </Box>

          <Select
            size="small"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            sx={{
              minWidth: 190,
              marginLeft: {
                xs: "0px !important",
                sm: "auto !important",
                md: "auto !important",
                lg: "auto !important",
              },
            }}
          >
            <MenuItem value="featured">Sort: Featured</MenuItem>

            <MenuItem value="low">Price: Low to High</MenuItem>

            <MenuItem value="high">Price: High to Low</MenuItem>
          </Select>
        </Stack>

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={32} />
          </Box>
        ) : (
          <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
        )}
      </Container>

      <CartDrawer
        isOpen={cartOpen}
        cartItems={cartItems}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
      />
    </>
  );
}

export default HomePage;
