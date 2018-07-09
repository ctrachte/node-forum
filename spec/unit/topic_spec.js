const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });
  describe("#create()", () => {

      it("should create a topic object with a title, and body", (done) => {
        Topic.create({
          title: "Where to go if you are stuck in Bloc",
          description: "Sometimes we get stuck on checkpoints...",
        })
        .then((topic) => {

          expect(topic.title).toBe("Where to go if you are stuck in Bloc");
          expect(topic.description).toBe("Sometimes we get stuck on checkpoints...");
          done();

        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
      it("should not create a Topic with missing description", (done) => {
        Topic.create({
          title: "Where to go if you are stuck in Bloc"
        })
        .then((post) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Topic.description cannot be null");
          done();
        })
      });

  });
  describe("#getPosts()", () => {

   it("should return posts of the current topic only", (done) => {
     this.topic.getPosts()
     .then((posts) => {
       for (let post of posts) {
         expect(post.topicId).toBe(this.topic.id);
       }
       done();
     });

   });

  });
});
