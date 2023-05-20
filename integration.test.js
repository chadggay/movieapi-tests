const to = require("./lib/to");
const {
  instance,
  userOne,
  userTwo,
  nonExistantUser,
  userThree,
} = require("./lib/setup");
const { v4: uuid } = require("uuid");

jest.setTimeout(20000);

describe("movies", () => {
  /* ======================= Movie Search ======================= */
  describe("search", () => {
    describe("with no query params", () => {
      beforeAll(async () => {
        const request = await to.object(instance.get(`movies/search`));
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an array result", () =>
        expect(response.data).toBeInstanceOf(Object));

      // movies
      test("should contain correct data property", () =>
        expect(response.data.data).toBeInstanceOf(Array));
      test("should contain correct number of movies", () =>
        expect(response.data.data.length).toBe(100));

      test("should contain correct title property", () =>
        expect(response.data.data[0].title).toBe("Kate & Leopold"));
      test("should contain correct year property", () =>
        expect(response.data.data[0].year).toBe(2001));
      test("should contain correct imdbID property", () =>
        expect(response.data.data[0].imdbID).toBe("tt0035423"));

      test("should contain correct imdbRating property", () =>
        expect(response.data.data[0].imdbRating).toBe(6.4));
      test("should contain correct rottenTomatoesRating property", () =>
        expect(response.data.data[0].rottenTomatoesRating).toBe(52));
      test("should contain correct metacriticRating property", () =>
        expect(response.data.data[0].metacriticRating).toBe(44));
      test("should contain correct classification property", () =>
        expect(response.data.data[0].classification).toBe("PG-13"));

      // pagination
      test("should contain correct pagination property", () =>
        expect(response.data.pagination).toBeInstanceOf(Object));
      test("should contain correct total property", () =>
        expect(response.data.pagination.total).toBe(12184));
      test("should contain correct lastPage property", () =>
        expect(response.data.pagination.lastPage).toBe(122));

      test("should contain correct prevPage property", () =>
        expect(response.data.pagination.prevPage).toBe(null));
      test("should contain correct nextPage property", () =>
        expect(response.data.pagination.nextPage).toBe(2));

      test("should contain correct perPage property", () =>
        expect(response.data.pagination.perPage).toBe(100));
      test("should contain correct currentPage property", () =>
        expect(response.data.pagination.currentPage).toBe(1));
      test("should contain correct from property", () =>
        expect(response.data.pagination.from).toBe(0));
      test("should contain correct to property", () =>
        expect(response.data.pagination.to).toBe(100));
    });

    describe("with year (2013) query params", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`movies/search?year=2013`)
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an array result", () =>
        expect(response.data).toBeInstanceOf(Object));

      // movies
      test("should contain correct data property", () =>
        expect(response.data.data).toBeInstanceOf(Array));
      test("should contain correct number of movies", () =>
        expect(response.data.data.length).toBe(100));

      test("should contain correct title property", () =>
        expect(response.data.data[0].title).toBe(
          "The Secret Life of Walter Mitty"
        ));
      test("should contain correct year property", () =>
        expect(response.data.data[0].year).toBe(2013));
      test("should contain correct imdbID property", () =>
        expect(response.data.data[0].imdbID).toBe("tt0359950"));

      test("should contain correct imdbRating property", () =>
        expect(response.data.data[0].imdbRating).toBe(7.3));
      test("should contain correct rottenTomatoesRating property", () =>
        expect(response.data.data[0].rottenTomatoesRating).toBe(52));
      test("should contain correct metacriticRating property", () =>
        expect(response.data.data[0].metacriticRating).toBe(54));
      test("should contain correct classification property", () =>
        expect(response.data.data[0].classification).toBe("PG"));

      // pagination
      test("should contain correct pagination property", () =>
        expect(response.data.pagination).toBeInstanceOf(Object));
      test("should contain correct total property", () =>
        expect(response.data.pagination.total).toBe(542));
      test("should contain correct lastPage property", () =>
        expect(response.data.pagination.lastPage).toBe(6));

      test("should contain correct prevPage property", () =>
        expect(response.data.pagination.prevPage).toBe(null));
      test("should contain correct nextPage property", () =>
        expect(response.data.pagination.nextPage).toBe(2));

      test("should contain correct perPage property", () =>
        expect(response.data.pagination.perPage).toBe(100));
      test("should contain correct currentPage property", () =>
        expect(response.data.pagination.currentPage).toBe(1));
      test("should contain correct from property", () =>
        expect(response.data.pagination.from).toBe(0));
      test("should contain correct to property", () =>
        expect(response.data.pagination.to).toBe(100));
    });

    describe("with year (1984) query params - no results within dataset", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`movies/search?year=1984`)
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an array result", () =>
        expect(response.data).toBeInstanceOf(Object));

      // movies
      test("should contain correct data property", () =>
        expect(response.data.data).toBeInstanceOf(Array));
      test("should contain correct number of movies", () =>
        expect(response.data.data.length).toBe(0));

      // pagination
      test("should contain correct pagination property", () =>
        expect(response.data.pagination).toBeInstanceOf(Object));
      test("should contain correct total property", () =>
        expect(response.data.pagination.total).toBe(0));
      test("should contain correct lastPage property", () =>
        expect(response.data.pagination.lastPage).toBe(0));

      test("should contain correct prevPage property", () =>
        expect(response.data.pagination.prevPage).toBe(null));
      test("should contain correct nextPage property", () =>
        expect(response.data.pagination.nextPage).toBe(null));

      test("should contain correct perPage property", () =>
        expect(response.data.pagination.perPage).toBe(100));
      test("should contain correct currentPage property", () =>
        expect(response.data.pagination.currentPage).toBe(1));
      test("should contain correct from property", () =>
        expect(response.data.pagination.from).toBe(0));
      test("should contain correct to property", () =>
        expect(response.data.pagination.to).toBe(0));
    });

    describe("with invalid year query params", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`movies/search?year=2014a`)
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 400", () =>
        expect(response.status).toBe(400));

      test("should contain message property", () =>
        expect(response.data.message).toBe(
          "Invalid year format. Format must be yyyy."
        ));
    });

    describe("with title (quiet) query params", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`movies/search?title=quiet`)
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an array result", () =>
        expect(response.data).toBeInstanceOf(Object));

      // movies
      test("should contain correct data property", () =>
        expect(response.data.data).toBeInstanceOf(Array));
      test("should contain correct number of movies", () =>
        expect(response.data.data.length).toBe(9));

      test("should contain correct title property", () =>
        expect(response.data.data[0].title).toBe("The Quiet Family"));
      test("should contain correct year property", () =>
        expect(response.data.data[0].year).toBe(1998));
      test("should contain correct imdbID property", () =>
        expect(response.data.data[0].imdbID).toBe("tt0188503"));

      test("should contain correct imdbRating property", () =>
        expect(response.data.data[0].imdbRating).toBe(7));
      test("should contain correct rottenTomatoesRating property", () =>
        expect(response.data.data[0].rottenTomatoesRating).toBe(80));
      test("should contain correct metacriticRating property", () =>
        expect(response.data.data[0].metacriticRating).toBe(null));
      test("should contain correct classification property", () =>
        expect(response.data.data[0].classification).toBe("N/A"));

      // pagination
      test("should contain correct pagination property", () =>
        expect(response.data.pagination).toBeInstanceOf(Object));
      test("should contain correct total property", () =>
        expect(response.data.pagination.total).toBe(9));
      test("should contain correct lastPage property", () =>
        expect(response.data.pagination.lastPage).toBe(1));

      test("should contain correct prevPage property", () =>
        expect(response.data.pagination.prevPage).toBe(null));
      test("should contain correct nextPage property", () =>
        expect(response.data.pagination.nextPage).toBe(null));

      test("should contain correct perPage property", () =>
        expect(response.data.pagination.perPage).toBe(100));
      test("should contain correct currentPage property", () =>
        expect(response.data.pagination.currentPage).toBe(1));
      test("should contain correct from property", () =>
        expect(response.data.pagination.from).toBe(0));
      test("should contain correct to property", () =>
        expect(response.data.pagination.to).toBe(9));
    });

    describe("with invalid page (abc) query params", () => {
      beforeAll(async () => {
        const request = await to.object(instance.get(`movies/search?page=abc`));
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 400", () =>
        expect(response.status).toBe(400));

      test("should contain message property", () =>
        expect(response.data.message).toBe(
          "Invalid page format. page must be a number."
        ));
    });

    describe("with page (66) query params", () => {
      beforeAll(async () => {
        const request = await to.object(instance.get(`movies/search?page=66`));
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an array result", () =>
        expect(response.data).toBeInstanceOf(Object));

      // movies
      test("should contain correct data property", () =>
        expect(response.data.data).toBeInstanceOf(Array));
      test("should contain correct number of movies", () =>
        expect(response.data.data.length).toBe(100));

      test("should contain correct title property", () =>
        expect(response.data.data[0].title).toBe("Raajneeti"));
      test("should contain correct year property", () =>
        expect(response.data.data[0].year).toBe(2010));
      test("should contain correct imdbID property", () =>
        expect(response.data.data[0].imdbID).toBe("tt1291465"));

      test("should contain correct imdbRating property", () =>
        expect(response.data.data[0].imdbRating).toBe(7.1));
      test("should contain correct rottenTomatoesRating property", () =>
        expect(response.data.data[0].rottenTomatoesRating).toBe(22));
      test("should contain correct metacriticRating property", () =>
        expect(response.data.data[0].metacriticRating).toBe(null));
      test("should contain correct classification property", () =>
        expect(response.data.data[0].classification).toBe("Not Rated"));

      // pagination
      test("should contain correct pagination property", () =>
        expect(response.data.pagination).toBeInstanceOf(Object));
      test("should contain correct total property", () =>
        expect(response.data.pagination.total).toBe(12184));
      test("should contain correct lastPage property", () =>
        expect(response.data.pagination.lastPage).toBe(122));

      test("should contain correct prevPage property", () =>
        expect(response.data.pagination.prevPage).toBe(65));
      test("should contain correct nextPage property", () =>
        expect(response.data.pagination.nextPage).toBe(67));

      test("should contain correct perPage property", () =>
        expect(response.data.pagination.perPage).toBe(100));
      test("should contain correct currentPage property", () =>
        expect(response.data.pagination.currentPage).toBe(66));
      test("should contain correct from property", () =>
        expect(response.data.pagination.from).toBe(6500));
      test("should contain correct to property", () =>
        expect(response.data.pagination.to).toBe(6600));
    });

    describe("with title, year and page query params", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`movies/search?title=the&year=1991&page=1`)
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an array result", () =>
        expect(response.data).toBeInstanceOf(Object));

      // movies
      test("should contain correct data property", () =>
        expect(response.data.data).toBeInstanceOf(Array));
      test("should contain correct number of movies", () =>
        expect(response.data.data.length).toBe(46));

      test("should contain correct title property", () =>
        expect(response.data.data[0].title).toBe("Flight of the Intruder"));
      test("should contain correct year property", () =>
        expect(response.data.data[0].year).toBe(1991));
      test("should contain correct imdbID property", () =>
        expect(response.data.data[0].imdbID).toBe("tt0099587"));

      test("should contain correct imdbRating property", () =>
        expect(response.data.data[0].imdbRating).toBe(5.8));
      test("should contain correct rottenTomatoesRating property", () =>
        expect(response.data.data[0].rottenTomatoesRating).toBe(25));
      test("should contain correct metacriticRating property", () =>
        expect(response.data.data[0].metacriticRating).toBe(null));
      test("should contain correct classification property", () =>
        expect(response.data.data[0].classification).toBe("PG-13"));

      // pagination
      test("should contain correct pagination property", () =>
        expect(response.data.pagination).toBeInstanceOf(Object));
      test("should contain correct total property", () =>
        expect(response.data.pagination.total).toBe(46));
      test("should contain correct lastPage property", () =>
        expect(response.data.pagination.lastPage).toBe(1));

      test("should contain correct prevPage property", () =>
        expect(response.data.pagination.prevPage).toBe(null));
      test("should contain correct nextPage property", () =>
        expect(response.data.pagination.nextPage).toBe(null));

      test("should contain correct perPage property", () =>
        expect(response.data.pagination.perPage).toBe(100));
      test("should contain correct currentPage property", () =>
        expect(response.data.pagination.currentPage).toBe(1));
      test("should contain correct from property", () =>
        expect(response.data.pagination.from).toBe(0));
      test("should contain correct to property", () =>
        expect(response.data.pagination.to).toBe(46));
    });

    describe("with page out of bounds", () => {
      beforeAll(async () => {
        const request = await to.object(instance.get(`movies/search?page=123`));
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an array result", () =>
        expect(response.data).toBeInstanceOf(Object));

      // movies
      test("should contain correct data property", () =>
        expect(response.data.data).toBeInstanceOf(Array));
      test("should contain correct number of movies", () =>
        expect(response.data.data.length).toBe(0));

      // pagination
      test("should contain correct pagination property", () =>
        expect(response.data.pagination).toBeInstanceOf(Object));
      test("should contain correct total property", () =>
        expect(response.data.pagination.total).toBe(12184));
      test("should contain correct lastPage property", () =>
        expect(response.data.pagination.lastPage).toBe(122));

      test("should contain correct prevPage property", () =>
        expect(response.data.pagination.prevPage).toBe(122));
      test("should contain correct nextPage property", () =>
        expect(response.data.pagination.nextPage).toBe(null));

      test("should contain correct perPage property", () =>
        expect(response.data.pagination.perPage).toBe(100));
      test("should contain correct currentPage property", () =>
        expect(response.data.pagination.currentPage).toBe(123));
      test("should contain correct from property", () =>
        expect(response.data.pagination.from).toBe(12200));
      test("should contain correct to property", () =>
        expect(response.data.pagination.to).toBe(12200));
    });
  });

  /* ======================= Movie Data ======================= */
  describe("data", () => {
    describe("with invalid query params", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`movies/data/tt0110912?aQueryParam=test`)
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 400", () =>
        expect(response.status).toBe(400));

      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
      test("should contain message property", () =>
        expect(response.data.message).toContain(
          "Query parameters are not permitted."
        ));
      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
    });

    describe("with movie that does not exist (99999) in data set", () => {
      beforeAll(async () => {
        const request = await to.object(instance.get(`movies/data/99999`));
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 404", () =>
        expect(response.status).toBe(404));

      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
    });

    describe("with movie that does exist (tt0110912)", () => {
      beforeAll(async () => {
        const request = await to.object(instance.get(`movies/data/tt0110912`));
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an array result", () =>
        expect(response.data).toBeInstanceOf(Object));

      test("should contain correct title property", () =>
        expect(response.data.title).toBe("Pulp Fiction"));
      test("should contain correct year property", () =>
        expect(response.data.year).toBe(1994));
      test("should contain correct runtime property", () =>
        expect(response.data.runtime).toBe(154));

      // genres
      test("genres should be an array result", () =>
        expect(response.data.genres).toBeInstanceOf(Array));
      test("should contain correct number of genres", () =>
        expect(response.data.genres.length).toBe(2));
      test("should contain correct genre property", () =>
        expect(response.data.genres[0]).toBe("Crime"));

      // principals
      test("principals should be an array result", () =>
        expect(response.data.principals).toBeInstanceOf(Array));
      test("should contain correct number of principals", () =>
        expect(response.data.principals.length).toBe(10));
      test("should contain correct id property", () =>
        expect(response.data.principals[0].id).toBe("nm0913300"));
      test("should contain correct category property", () =>
        expect(response.data.principals[0].category).toBe(
          "production_designer"
        ));
      test("should contain correct name property", () =>
        expect(response.data.principals[0].name).toBe("David Wasco"));

      test("characters should be an array result", () =>
        expect(response.data.principals[1].characters).toBeInstanceOf(Array));
      test("characters should be an array result", () =>
        expect(response.data.principals[1].characters.length).toBe(1));
      test("characters should be an array result", () =>
        expect(response.data.principals[1].characters[0]).toBe("Vincent Vega"));

      // ratings
      test("ratings should be an array result", () =>
        expect(response.data.ratings).toBeInstanceOf(Array));
      test("should contain correct number of ratings", () =>
        expect(response.data.ratings.length).toBe(3));

      // ratings - imdb
      test("should contain correct source property", () =>
        expect(response.data.ratings[0].source).toBe(
          "Internet Movie Database"
        ));
      test("should contain correct source property", () =>
        expect(response.data.ratings[0].value).toBe(8.9));

      // ratings - rotten tomatoes
      test("should contain correct source property", () =>
        expect(response.data.ratings[1].source).toBe("Rotten Tomatoes"));
      test("should contain correct source property", () =>
        expect(response.data.ratings[1].value).toBe(92));

      // ratings - metracritic
      test("should contain correct source property", () =>
        expect(response.data.ratings[2].source).toBe("Metacritic"));
      test("should contain correct source property", () =>
        expect(response.data.ratings[2].value).toBe(94));

      test("should contain correct boxoffice property", () =>
        expect(response.data.boxoffice).toBe(107928762));
      test("should contain correct poster property", () =>
        expect(response.data.poster).toBe(
          "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
        ));
      test("should contain correct plot property", () =>
        expect(response.data.plot).toBe(
          "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
        ));
    });
  });
});

/* ======================= User Registration & Login ======================= */
let userOneBearerToken;
let profileUserTwoBearerToken;
let profileUserOneBearerToken;
let shortExpiryBearerToken;
let shortExpiryRefreshToken;
let userThreeBearerToken;
let userThreeRefreshToken;

describe("user", () => {
  describe("registration", () => {
    describe("with missing email", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/register`, {
            password: userOne.password,
          })
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });
      test("should return status code 400", () =>
        expect(response.status).toBe(400));

      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
    });

    describe("with missing password", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/register`, {
            email: userOne.email,
          })
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });
      test("should return status code 400", () =>
        expect(response.status).toBe(400));

      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
    });

    describe("with missing email and password", () => {
      beforeAll(async () => {
        const request = await to.object(instance.post(`user/register`, {}));
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });
      test("should return status code 400", () =>
        expect(response.status).toBe(400));

      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
    });

    describe("with valid email and password", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/register`, {
            email: userOne.email,
            password: userOne.password,
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 201", () =>
        expect(response.status).toBe(201));

      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
    });
  });
});

describe("login", () => {
  describe("with missing email", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.post(`user/login`, {
          password: userOne.password,
        })
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });
    test("should return status code 400", () =>
      expect(response.status).toBe(400));

    test("should contain message property", () =>
      expect(response.data).toHaveProperty("message"));
  });

  describe("with missing password", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.post(`user/login`, { email: userOne.email })
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });
    test("should return status code 400", () =>
      expect(response.status).toBe(400));

    test("should contain message property", () =>
      expect(response.data).toHaveProperty("message"));
  });

  describe("with non-existing user (email)", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.post(`user/login`, {
          email: nonExistantUser.email,
          password: nonExistantUser.password,
        })
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 401", () =>
      expect(response.status).toBe(401));

    test("should contain message property", () =>
      expect(response.data).toHaveProperty("message"));
  });

  describe("with invalid password", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.post(`user/login`, {
          email: userOne.email,
          password: "invalid-password",
        })
      );
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 401", () =>
      expect(response.status).toBe(401));

    test("should contain message property", () =>
      expect(response.data).toHaveProperty("message"));
  });

  describe("with valid email and password", () => {
    beforeAll(async () => {
      const request = await to.object(
        instance.post(`user/login`, {
          email: userOne.email,
          password: userOne.password,
        })
      );

      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return status code 200", () =>
      expect(response.status).toBe(200));

    describe("bearerToken", () => {
      test("should contain token property", () =>
        expect(response.data).toHaveProperty("bearerToken"));
      test("should contain token_type property", () =>
        expect(response.data.bearerToken).toHaveProperty("token_type"));
      test("should contain expires_in property", () =>
        expect(response.data.bearerToken).toHaveProperty("expires_in"));
      test("should contain correct token_type", () =>
        expect(response.data.bearerToken.token_type).toBe(`Bearer`));
      test("should contain correct expires_in", () =>
        expect(response.data.bearerToken.expires_in).toBe(600));
    });

    describe("refreshToken", () => {
      test("should contain token property", () =>
        expect(response.data).toHaveProperty("refreshToken"));
      test("should contain token_type property", () =>
        expect(response.data.refreshToken).toHaveProperty("token_type"));
      test("should contain expires_in property", () =>
        expect(response.data.refreshToken).toHaveProperty("expires_in"));
      test("should contain correct token_type", () =>
        expect(response.data.refreshToken.token_type).toBe(`Refresh`));
      test("should contain correct expires_in", () =>
        expect(response.data.refreshToken.expires_in).toBe(86400));
    });
  });
});

/* ======================= People ======================= */
describe("people", () => {
  beforeAll(async () => {
    const login = await instance.post(`user/login`, {
      email: userOne.email,
      password: userOne.password,
    });
    userOneBearerToken = login.data.bearerToken.token;
  });

  describe("with invalid auth", () => {
    describe("with no authorisation header", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`people/nm0000686`, {
            headers: {},
          })
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 401", () =>
        expect(response.status).toBe(401));

      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
      test("should contain specific message for 'Authorization header ('Bearer token') not found'", () =>
        expect(response.data.message).toBe(
          "Authorization header ('Bearer token') not found"
        ));
      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
    });
    describe("with invalid bearer token", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`people/nm0000686`, {
            headers: { Authorization: `Bearer notARealToken` },
          })
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 401", () =>
        expect(response.status).toBe(401));

      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
      test("should contain message property", () =>
        expect(response.data.message).toBe("Invalid JWT token"));
      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
    });

    describe("with malformed bearer token", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`people/nm0000686`, {
            headers: { Authorization: `notBearer ` },
          })
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 401", () =>
        expect(response.status).toBe(401));

      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
      test("should contain specific message for 'Authorization header ('Bearer token') not found'", () =>
        expect(response.data.message).toBe(
          "Authorization header ('Bearer token') not found"
        ));
      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
    });

    describe("person that does not exist (99999) in data set", () => {
      beforeAll(async () => {
        const request = await to.object(instance.get(`people/99999`));
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 401", () =>
        expect(response.status).toBe(401));

      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
      test("should contain message property", () =>
        expect(response.data.message).toBe(
          "Authorization header ('Bearer token') not found"
        ));
      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
    });

    describe("person that does exist (nm0000686)", () => {
      beforeAll(async () => {
        const request = await to.object(instance.get(`people/nm0000686`));
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 401", () =>
        expect(response.status).toBe(401));

      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
      test("should contain message property", () =>
        expect(response.data.message).toBe(
          "Authorization header ('Bearer token') not found"
        ));
      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
    });
  });

  describe("with valid auth", () => {
    describe("with invalid query params", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`people/nm0000686?aQueryParam=test`, {
            headers: { Authorization: `Bearer ${userOneBearerToken}` },
          })
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 400", () =>
        expect(response.status).toBe(400));

      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
      test("should contain message property", () =>
        expect(response.data.message).toContain(
          "Query parameters are not permitted."
        ));
      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
    });

    describe("person that does not exist (99999) in data set", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`people/99999`, {
            headers: { Authorization: `Bearer ${userOneBearerToken}` },
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 404", () =>
        expect(response.status).toBe(404));

      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
    });

    describe("person that does exist (people/nm0000686)", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`people/nm0000686`, {
            headers: { Authorization: `Bearer ${userOneBearerToken}` },
          })
        );
        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an array result", () =>
        expect(response.data).toBeInstanceOf(Object));

      test("should contain correct name property", () =>
        expect(response.data.name).toBe("Christopher Walken"));
      test("should contain correct birthYear property", () =>
        expect(response.data.birthYear).toBe(1943));
      test("should contain correct deathYear property", () =>
        expect(response.data.deathYear).toBe(null));

      test("roles should be an array result", () =>
        expect(response.data.roles).toBeInstanceOf(Array));

      test("should contain correct number of roles", () =>
        expect(response.data.roles.length).toBe(30));
      test("should contain correct movieName property", () =>
        expect(response.data.roles[0].movieName).toBe(
          "The Comfort of Strangers"
        ));
      test("should contain correct movieId property", () =>
        expect(response.data.roles[0].movieId).toBe("tt0099292"));

      test("should contain correct category property", () =>
        expect(response.data.roles[0].category).toBe("actor"));
      test("should contain correct imdbRating property", () =>
        expect(response.data.roles[0].imdbRating).toBe(6.3));

      test("characters should be an array result", () =>
        expect(response.data.roles[0].characters).toBeInstanceOf(Array));
      test("should contain correct number of characters", () =>
        expect(response.data.roles[0].characters.length).toBe(1));
      test("should contain correct character array value", () =>
        expect(response.data.roles[0].characters[0]).toBe("Robert"));
    });
  });

  describe("token expiry", () => {
    beforeAll(async () => {
      const shortLogin = await instance.post(`user/login`, {
        email: userOne.email,
        password: userOne.password,
        bearerExpiresInSeconds: 1,
      });
      shortExpiryBearerToken = shortLogin.data.bearerToken.token;

      await new Promise((r) => setTimeout(r, 3000));
    });

    describe("with expired bearer token", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`people/nm0000686`, {
            headers: { Authorization: `Bearer ${shortExpiryBearerToken}` },
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 401", async () => {
        expect(response.status).toBe(401);
      });
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
    });
  });
});

/* ======================= Profile ======================= */

describe("profile", () => {
  beforeAll(async () => {
    const request = await to.object(
      instance.post(`user/register`, {
        email: userTwo.email,
        password: userTwo.password,
      })
    );

    const userOnelogin = await instance.post(`user/login`, {
      email: userOne.email,
      password: userOne.password,
    });
    profileUserOneBearerToken = userOnelogin.data.bearerToken.token;

    const login = await instance.post(`user/login`, {
      email: userTwo.email,
      password: userTwo.password,
    });
    profileUserTwoBearerToken = login.data.bearerToken.token;
  });

  describe("retrieval with default profile values", () => {
    describe("with unauthenticated request for non existent user", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`user/${uuid()}@email.com/profile`)
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 404", () =>
        expect(response.status).toBe(404));

      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
    });

    describe("with authenticated request for non existent user", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`user/${uuid()}@email.com/profile`, {
            headers: { Authorization: `Bearer ${profileUserOneBearerToken}` },
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 404", () =>
        expect(response.status).toBe(404));

      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
    });

    describe("with unauthenticated user default profile values", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`user/${userOne.email}/profile`)
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });
      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return user email property", () =>
        expect(response.data.email).toBe(userOne.email));
      test("should return null for unset firstName", () =>
        expect(response.data.firstName).toBe(null));
      test("should return null for unset lastName", () =>
        expect(response.data.lastName).toBe(null));
      test("should not return dob property", () =>
        expect(response.data).not.toHaveProperty("dob"));
      test("should not return address property", () =>
        expect(response.data).not.toHaveProperty("address"));
    });

    describe("with authenticated matching user default profile values", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`user/${userOne.email}/profile`, {
            headers: { Authorization: `Bearer ${profileUserOneBearerToken}` },
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });
      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return user email property", () =>
        expect(response.data.email).toBe(userOne.email));
      test("should return null for unset firstName", () =>
        expect(response.data.firstName).toBe(null));
      test("should return null for unset lastName", () =>
        expect(response.data.lastName).toBe(null));
      test("should return null for unset dob", () =>
        expect(response.data.dob).toBe(null));
      test("should return null for unset address", () =>
        expect(response.data.address).toBe(null));
    });

    describe("with authenticated non-matching user default profile values", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`user/${userOne.email}/profile`, {
            headers: { Authorization: `Bearer ${profileUserTwoBearerToken}` },
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });
      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return user email property", () =>
        expect(response.data.email).toBe(userOne.email));
      test("should return null for unset firstName", () =>
        expect(response.data.firstName).toBe(null));
      test("should return null for unset lastName", () =>
        expect(response.data.lastName).toBe(null));
      test("should not return dob property", () =>
        expect(response.data).not.toHaveProperty("dob"));
      test("should not return address property", () =>
        expect(response.data).not.toHaveProperty("address"));
    });
  });

  describe("update of user profile", () => {
    describe("with unauthenticated user", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.put(`user/${userOne.email}/profile`, {
            firstName: userOne.firstName,
            lastName: userOne.lastName,
            address: userOne.address,
            dob: userOne.dob,
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 401", () =>
        expect(response.status).toBe(401));

      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
    });

    describe("with authenticated non-matching user", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.put(
            `user/${userOne.email}/profile`,
            {
              firstName: userOne.firstName,
              lastName: userOne.lastName,
              address: userOne.address,
              dob: userOne.dob,
            },
            {
              headers: { Authorization: `Bearer ${profileUserTwoBearerToken}` },
            }
          )
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 403", () =>
        expect(response.status).toBe(403));
      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data).toHaveProperty("message"));
    });

    describe("with authenticated matching user", () => {
      describe("with missing body keys", () => {
        beforeAll(async () => {
          const request = await to.object(
            instance.put(
              `user/${userOne.email}/profile`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${profileUserOneBearerToken}`,
                },
              }
            )
          );
          return (response = request.resolve
            ? request.resolve
            : request.reject.response);
        });

        test("should return status code 400", () =>
          expect(response.status).toBe(400));
        test("should return error with boolean of true", () =>
          expect(response.data.error).toBe(true));
        test("should contain message property", () =>
          expect(response.data).toHaveProperty("message"));
        test("should return specific message for 'Request body incomplete: firstName, lastName, dob and address are required.'", () =>
          expect(response.data.message).toBe(
            "Request body incomplete: firstName, lastName, dob and address are required."
          ));
      });

      describe("with invalid firstName", () => {
        beforeAll(async () => {
          const request = await to.object(
            instance.put(
              `user/${userOne.email}/profile`,
              {
                firstName: 123,
                lastName: userOne.lastName,
                address: userOne.address,
                dob: userOne.dob,
              },
              {
                headers: {
                  Authorization: `Bearer ${profileUserOneBearerToken}`,
                },
              }
            )
          );
          return (response = request.resolve
            ? request.resolve
            : request.reject.response);
        });

        test("should return status code 400", () =>
          expect(response.status).toBe(400));

        test("should return error with boolean of true", () =>
          expect(response.data.error).toBe(true));
        test("should contain message property", () =>
          expect(response.data).toHaveProperty("message"));
        test("should return a specific message for 'Request body invalid: firstName, lastName and address must be strings only.'", () =>
          expect(response.data.message).toBe(
            "Request body invalid: firstName, lastName and address must be strings only."
          ));
      });

      describe("with invalid lastName", () => {
        beforeAll(async () => {
          const request = await to.object(
            instance.put(
              `user/${userOne.email}/profile`,
              {
                firstName: userOne.firstName,
                lastName: 987,
                address: userOne.address,
                dob: userOne.dob,
              },
              {
                headers: {
                  Authorization: `Bearer ${profileUserOneBearerToken}`,
                },
              }
            )
          );
          return (response = request.resolve
            ? request.resolve
            : request.reject.response);
        });

        test("should return status code 400", () =>
          expect(response.status).toBe(400));

        test("should return error with boolean of true", () =>
          expect(response.data.error).toBe(true));
        test("should contain message property", () =>
          expect(response.data).toHaveProperty("message"));
        test("should return a specific message for 'Request body invalid: firstName, lastName and address must be strings only.'", () =>
          expect(response.data.message).toBe(
            "Request body invalid: firstName, lastName and address must be strings only."
          ));
      });

      describe("with invalid address", () => {
        beforeAll(async () => {
          const request = await to.object(
            instance.put(
              `user/${userOne.email}/profile`,
              {
                firstName: userOne.firstName,
                lastName: userOne.lastName,
                address: true,
                dob: userOne.dob,
              },
              {
                headers: {
                  Authorization: `Bearer ${profileUserOneBearerToken}`,
                },
              }
            )
          );
          return (response = request.resolve
            ? request.resolve
            : request.reject.response);
        });

        test("should return status code 400", () =>
          expect(response.status).toBe(400));

        test("should return error with boolean of true", () =>
          expect(response.data.error).toBe(true));
        test("should contain message property", () =>
          expect(response.data).toHaveProperty("message"));
        test("should return a specific message for 'Request body invalid: firstName, lastName and address must be strings only.'", () =>
          expect(response.data.message).toBe(
            "Request body invalid: firstName, lastName and address must be strings only."
          ));
      });

      describe("with invalid date format", () => {
        beforeAll(async () => {
          const request = await to.object(
            instance.put(
              `user/${userOne.email}/profile`,
              {
                firstName: userOne.firstName,
                lastName: userOne.lastName,
                address: userOne.address,
                dob: new Date().toISOString(),
              },
              {
                headers: {
                  Authorization: `Bearer ${profileUserOneBearerToken}`,
                },
              }
            )
          );
          return (response = request.resolve
            ? request.resolve
            : request.reject.response);
        });

        test("should return status code 400", () =>
          expect(response.status).toBe(400));

        test("should return error with boolean of true", () =>
          expect(response.data.error).toBe(true));
        test("should contain message property", () =>
          expect(response.data).toHaveProperty("message"));
        test("should return a specific message for 'Invalid input: dob must be a real date in format YYYY-MM-DD.'", () =>
          expect(response.data.message).toBe(
            "Invalid input: dob must be a real date in format YYYY-MM-DD."
          ));
      });

      describe("with valid formatted non-real date (out of bounds check)", () => {
        beforeAll(async () => {
          const request = await to.object(
            instance.put(
              `user/${userOne.email}/profile`,
              {
                firstName: userOne.firstName,
                lastName: userOne.lastName,
                address: userOne.address,
                dob: "2021-13-32",
              },
              {
                headers: {
                  Authorization: `Bearer ${profileUserOneBearerToken}`,
                },
              }
            )
          );
          return (response = request.resolve
            ? request.resolve
            : request.reject.response);
        });

        test("should return status code 400", () =>
          expect(response.status).toBe(400));

        test("should return error with boolean of true", () =>
          expect(response.data.error).toBe(true));
        test("should contain message property", () =>
          expect(response.data).toHaveProperty("message"));
        test("should return a specific message for 'Invalid input: dob must be a real date in format YYYY-MM-DD.'", () =>
          expect(response.data.message).toBe(
            "Invalid input: dob must be a real date in format YYYY-MM-DD."
          ));
      });

      describe("with valid formatted non-real date (JavaScript date rollover check)", () => {
        beforeAll(async () => {
          const request = await to.object(
            instance.put(
              `user/${userOne.email}/profile`,
              {
                firstName: userOne.firstName,
                lastName: userOne.lastName,
                address: userOne.address,
                dob: "2021-04-31",
              },
              {
                headers: {
                  Authorization: `Bearer ${profileUserOneBearerToken}`,
                },
              }
            )
          );
          return (response = request.resolve
            ? request.resolve
            : request.reject.response);
        });

        test("should return status code 400", () =>
          expect(response.status).toBe(400));

        test("should return error with boolean of true", () =>
          expect(response.data.error).toBe(true));
        test("should contain message property", () =>
          expect(response.data).toHaveProperty("message"));
        test("should return a specific message for 'Invalid input: dob must be a real date in format YYYY-MM-DD.'", () =>
          expect(response.data.message).toBe(
            "Invalid input: dob must be a real date in format YYYY-MM-DD."
          ));
      });

      describe("with valid formatted non-real date (non leap-year check)", () => {
        beforeAll(async () => {
          const request = await to.object(
            instance.put(
              `user/${userOne.email}/profile`,
              {
                firstName: userOne.firstName,
                lastName: userOne.lastName,
                address: userOne.address,
                dob: "2021-02-29",
              },
              {
                headers: {
                  Authorization: `Bearer ${profileUserOneBearerToken}`,
                },
              }
            )
          );
          return (response = request.resolve
            ? request.resolve
            : request.reject.response);
        });

        test("should return status code 400", () =>
          expect(response.status).toBe(400));

        test("should return error with boolean of true", () =>
          expect(response.data.error).toBe(true));
        test("should contain message property", () =>
          expect(response.data).toHaveProperty("message"));
      });

      describe("with valid date in the future", () => {
        beforeAll(async () => {
          const request = await to.object(
            instance.put(
              `user/${userOne.email}/profile`,
              {
                firstName: userOne.firstName,
                lastName: userOne.lastName,
                address: userOne.address,
                dob: "2031-05-31",
              },
              {
                headers: {
                  Authorization: `Bearer ${profileUserOneBearerToken}`,
                },
              }
            )
          );
          return (response = request.resolve
            ? request.resolve
            : request.reject.response);
        });

        test("should return status code 400", () =>
          expect(response.status).toBe(400));

        test("should return error with boolean of true", () =>
          expect(response.data.error).toBe(true));
        test("should contain message property", () =>
          expect(response.data).toHaveProperty("message"));
        test("should return a specific message for 'Invalid input, dob must be a date in the past.'", () =>
          expect(response.data.message).toBe(
            "Invalid input: dob must be a date in the past."
          ));
      });

      describe("with valid date in the past", () => {
        beforeAll(async () => {
          const request = await to.object(
            instance.put(
              `user/${userOne.email}/profile`,
              {
                firstName: userOne.firstName,
                lastName: userOne.lastName,
                address: userOne.address,
                dob: userOne.dob,
              },
              {
                headers: {
                  Authorization: `Bearer ${profileUserOneBearerToken}`,
                },
              }
            )
          );
          return (response = request.resolve
            ? request.resolve
            : request.reject.response);
        });

        test("should return status code 200", () =>
          expect(response.status).toBe(200));
        test("should be an object result", () =>
          expect(response.data).toBeInstanceOf(Object));
        test("should return user email property", () =>
          expect(response.data.email).toBe(userOne.email));
        test("should return updated firstName", () =>
          expect(response.data.firstName).toBe(userOne.firstName));
        test("should return updated lastName", () =>
          expect(response.data.lastName).toBe(userOne.lastName));
        test("should return updated dob", () =>
          expect(response.data.dob).toBe(userOne.dob));
        test("should return updated address", () =>
          expect(response.data.address).toBe(userOne.address));
      });
    });
  });

  describe("retrieval after update of user profile", () => {
    describe("with unauthenticated user updated profile values", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`user/${userOne.email}/profile`)
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });
      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return user email property", () =>
        expect(response.data.email).toBe(userOne.email));
      test("should return updated firstName", () =>
        expect(response.data.firstName).toBe(userOne.firstName));
      test("should return updated lastName", () =>
        expect(response.data.lastName).toBe(userOne.lastName));
      test("should not return dob property", () =>
        expect(response.data).not.toHaveProperty("dob"));
      test("should not return address property", () =>
        expect(response.data).not.toHaveProperty("address"));
    });

    describe("with authenticated matching user updated profile values", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`user/${userOne.email}/profile`, {
            headers: { Authorization: `Bearer ${profileUserOneBearerToken}` },
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });
      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return user email property", () =>
        expect(response.data.email).toBe(userOne.email));
      test("should return updated firstName", () =>
        expect(response.data.firstName).toBe(userOne.firstName));
      test("should return updated lastName", () =>
        expect(response.data.lastName).toBe(userOne.lastName));
      test("should return updated dob", () =>
        expect(response.data.dob).toBe(userOne.dob));
      test("should return updated address", () =>
        expect(response.data.address).toBe(userOne.address));
    });

    describe("with authenticated non-matching user updated profile values", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.get(`user/${userOne.email}/profile`, {
            headers: { Authorization: `Bearer ${profileUserTwoBearerToken}` },
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });
      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return user email property", () =>
        expect(response.data.email).toBe(userOne.email));
      test("should return updated firstName", () =>
        expect(response.data.firstName).toBe(userOne.firstName));
      test("should return updated lastName", () =>
        expect(response.data.lastName).toBe(userOne.lastName));
      test("should not return dob property", () =>
        expect(response.data).not.toHaveProperty("dob"));
      test("should not return address property", () =>
        expect(response.data).not.toHaveProperty("address"));
    });
  });
});

/* ======================= Tokens ======================= */
describe("tokens", () => {
  beforeAll(async () => {
    await instance.post(`user/register`, {
      email: userThree.email,
      password: userThree.password,
    });
  });

  describe("refresh", () => {
    beforeAll(async () => {
      const login = await instance.post(`user/login`, {
        email: userThree.email,
        password: userThree.password,
      });
      userThreeBearerToken = login.data.bearerToken.token;
      userThreeRefreshToken = login.data.refreshToken.token;

      const request = await to.object(
        instance.post(`user/refresh`, {
          refreshToken: userThreeRefreshToken,
        })
      );

      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    describe("with incomplete body", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/refresh`, {
            refreshToken: null,
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return status code 400", () =>
        expect(response.status).toBe(400));

      test("should return error with boolean of false", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data.message).toBe(
          "Request body incomplete, refresh token required"
        ));
    });

    describe("with invalid refreshToken", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/refresh`, {
            refreshToken: "notARealRefreshToken",
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return status code 401", () =>
        expect(response.status).toBe(401));
      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data.message).toBe("Invalid JWT token"));
    });

    describe("with expired refreshToken", () => {
      beforeAll(async () => {
        const shortRefreshLogin = await instance.post(`user/login`, {
          email: userOne.email,
          password: userOne.password,
          refreshExpiresInSeconds: 1,
        });
        shortExpiryRefreshToken = shortRefreshLogin.data.bearerToken.token;

        await new Promise((r) => setTimeout(r, 3000));

        const request = await to.object(
          instance.post(`user/refresh`, {
            refreshToken: `${shortExpiryRefreshToken}`,
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return status code 401", () =>
        expect(response.status).toBe(401));
      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data.message).toBe("JWT token has expired"));
    });

    describe("with valid refreshToken", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/refresh`, {
            refreshToken: userThreeRefreshToken,
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should return status code 200", () =>
        expect(response.status).toBe(200));

      test("should contain token property", () =>
        expect(response.data).toHaveProperty("bearerToken"));
      test("should contain token_type property", () =>
        expect(response.data.bearerToken).toHaveProperty("token_type"));
      test("should contain expires_in property", () =>
        expect(response.data.bearerToken).toHaveProperty("expires_in"));
      test("should contain correct token_type", () =>
        expect(response.data.bearerToken.token_type).toBe(`Bearer`));
      test("should contain correct expires_in", () =>
        expect(response.data.bearerToken.expires_in).toBe(600));

      test("should contain token property", () =>
        expect(response.data).toHaveProperty("refreshToken"));
      test("should contain token_type property", () =>
        expect(response.data.refreshToken).toHaveProperty("token_type"));
      test("should contain expires_in property", () =>
        expect(response.data.refreshToken).toHaveProperty("expires_in"));
      test("should contain correct token_type", () =>
        expect(response.data.refreshToken.token_type).toBe(`Refresh`));
      test("should contain correct expires_in", () =>
        expect(response.data.refreshToken.expires_in).toBe(86400));
    });
  });

  describe("logout", () => {
    beforeAll(async () => {
      const login = await instance.post(`user/login`, {
        email: userThree.email,
        password: userThree.password,
      });
      userThreeBearerToken = login.data.bearerToken.token;
      userThreeRefreshToken = login.data.refreshToken.token;
    });

    describe("with incomplete body", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/logout`, {
            refreshToken: null,
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return status code 400", () =>
        expect(response.status).toBe(400));

      test("should return error with boolean of false", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data.message).toBe(
          "Request body incomplete, refresh token required"
        ));
    });

    describe("with invalid refreshToken", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/logout`, {
            refreshToken: "notARealRefreshToken",
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return status code 401", () =>
        expect(response.status).toBe(401));
      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data.message).toBe("Invalid JWT token"));
    });

    describe("with expired refreshToken", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/logout`, {
            refreshToken: `${shortExpiryRefreshToken}`,
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return status code 401", () =>
        expect(response.status).toBe(401));
      test("should return error with boolean of true", () =>
        expect(response.data.error).toBe(true));
      test("should contain message property", () =>
        expect(response.data.message).toBe("JWT token has expired"));
    });

    describe("with valid refreshToken", () => {
      beforeAll(async () => {
        const request = await to.object(
          instance.post(`user/logout`, {
            refreshToken: userThreeRefreshToken,
          })
        );

        return (response = request.resolve
          ? request.resolve
          : request.reject.response);
      });

      test("should be an object result", () =>
        expect(response.data).toBeInstanceOf(Object));
      test("should return status code 200", () =>
        expect(response.status).toBe(200));
      test("should return error with boolean of false", () =>
        expect(response.data.error).toBe(false));
      test("should contain message property", () =>
        expect(response.data.message).toBe("Token successfully invalidated"));
    });
  });
});

/* ======================= Misc ======================= */

describe("miscellaneous", () => {
  describe("with non-existent route", () => {
    beforeAll(async () => {
      const request = await to.object(instance.get(`${uuid()}`));
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("return a status of 404", () => expect(response.status).toBe(404));
  });

  describe("with swagger docs route", () => {
    beforeAll(async () => {
      const request = await to.object(instance.get(``));
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("return a status of 200", () => expect(response.status).toBe(200));

    test("should return Swagger UI", () =>
      expect(response.data).toContain("Swagger UI"));
  });

  describe("with cors header", () => {
    beforeAll(async () => {
      const request = await to.object(instance.get(``));
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("return a status of 200", () => expect(response.status).toBe(200));

    test("should return access-control-allow-origin in headers", () =>
      expect(response.headers).toHaveProperty("access-control-allow-origin"));
  });
});

/* ======================= Me ======================= */
/*
describe("Me", () => {
  describe("with student information", () => {
    beforeAll(async () => {
      const request = await to.object(instance.get("me"));
      return (response = request.resolve
        ? request.resolve
        : request.reject.response);
    });

    test("should return name property", () =>
      expect(response.data).toHaveProperty("name"));
    test("should return student_number property", () =>
      expect(response.data).toHaveProperty("student_number"));
  });
});
*/
