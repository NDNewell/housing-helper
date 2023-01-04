const express = require("express");
const fs = require("fs");
const cors = require("cors");

const customRoutes = (app) => {
  app.get("/listings/search", (req, res) => {
    // Read the file
    const data = JSON.parse(fs.readFileSync("db.json", "utf8"));

    // Get the query parameters from the request
    const { refinements, searchQuery, page, pageLimit, sort } = req.query;
    const defaultPage = 1;
    const defaultPageLimit = 10;

    let filteredListItems = data.listings;

    // Filter the listings by amenities if provided
    if (refinements) {
      const refinementsList = refinements.split(",");
      filteredListItems = filteredListItems.filter((listItem) => {
        const allAmenitiesForListItem = listItem.units.flatMap(
          (unit) => unit.amenities
        );
        return refinementsList.every((amenity) =>
          Array.from(new Set(allAmenitiesForListItem)).includes(amenity)
        );
      });
    }

    // Filter the listings by search query if provided
    if (searchQuery) {
      filteredListItems = filteredListItems.filter((listItem) => {
        return listItem.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    // Sort the listings according to specific sort param
    if (sort) {
      switch (sort) {
        case "asc":
          filteredListItems = filteredListItems.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "desc":
          filteredListItems = filteredListItems.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;
        default:
          break;
      }
    }

    // Use default values if no page and pageLimit query strings are provided
    const parsedPage = page ? parseInt(page) : defaultPage;
    const parsedPageLimit = pageLimit ? parseInt(pageLimit) : defaultPageLimit;

    // Calculate the starting index and ending index for the paginated results
    const startIndex = (parsedPage - 1) * parsedPageLimit;
    const endIndex = parsedPage * parsedPageLimit;

    // Slice the results to get the paginated listings
    const paginatedListItems = filteredListItems.slice(startIndex, endIndex);

    // Calculate the next and previous page numbers
    const nextPage = parsedPage + 1;
    const prevPage = parsedPage - 1;

    // Create the meta object for the pagination
    const meta = {
      currentPage: parsedPage,
      nextPage:
        nextPage <= Math.ceil(filteredListItems.length / parsedPageLimit)
          ? nextPage
          : null,
      prevPage: prevPage > 0 ? prevPage : null,
      totalPages: Math.ceil(filteredListItems.length / parsedPageLimit),
      totalResults: filteredListItems.length,
    };

    // Return the paginated listings with the meta object
    res.json({ listings: paginatedListItems, meta });
  });

  app.get("/listings/amenities", (req, res) => {
    // Read the file
    const data = JSON.parse(fs.readFileSync("db.json", "utf8"));

    // Get all available amenities
    let allAmenities = data.listings.reduce((amenities, listing) => {
      listing.units.forEach((unit) => {
        unit.amenities.forEach((amenity) => amenities.add(amenity));
      });
      return amenities;
    }, new Set());

    // Convert the set to an array and return it
    allAmenities = Array.from(allAmenities);
    res.json(allAmenities);
  });
};

const app = express();
app.use(cors());
customRoutes(app);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
