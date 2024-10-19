import Int "mo:base/Int";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Time "mo:base/Time";
import Text "mo:base/Text";

actor {
  type BlogPost = {
    id: Nat;
    title: Text;
    content: Text;
    timestamp: Int;
  };

  stable var posts : [BlogPost] = [];
  stable var nextId : Nat = 0;

  public func addPost(title: Text, content: Text) : async Nat {
    let post : BlogPost = {
      id = nextId;
      title = title;
      content = content;
      timestamp = Time.now();
    };
    posts := Array.append(posts, [post]);
    nextId += 1;
    nextId - 1
  };

  public query func getPosts() : async [BlogPost] {
    Array.reverse(posts)
  };
}
