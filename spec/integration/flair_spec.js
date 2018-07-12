const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;


describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair;

    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Winter Games",
        description: "Post your Winter Games stories."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Snowball Fighting",
          body: "So much snow!",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;

          Flair.create({
            name: "Blue",
            color: "blue",
            postId: this.post.id
          })
          .then((flair) => {
            this.flair = flair;
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });

    });

  });
  describe("GET /topics/:topicId/posts/:postId/flairs/new", () => {

    it("should render a new flair form", (done) => {
      request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      });
    });

  });
  describe("POST /topics/:topicId/posts/:postId/flairs/create", () => {

    it("should create a new flair and redirect", (done) => {
       const options = {
         url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/create`,
         form: {
           name: "Snow",
           color: "White"
         }
       };
       request.post(options,
         (err, res, body) => {

           Flair.findOne({where: {name: "Snow"}})
           .then((flair) => {
             expect(flair).not.toBeNull();
             expect(flair.name).toBe("Snow");
             expect(flair.color).toBe("White");
             expect(flair.postId).not.toBeNull();
             done();
           })
           .catch((err) => {
             console.log(err);
             done();
           });
         }
       );
     });

  });
  describe("GET /topics/:topicId/posts/:postId/flairs/:id", () => {

    it("should render a view with the selected flair", (done) => {
      request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Blue");
        done();
      });
    });

  });
});
