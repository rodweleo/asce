import CertifiedData "mo:base/CertifiedData";
import Char "mo:base/Char";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Option "mo:base/Option";
import Prim "mo:prim";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Cycles "mo:base/ExperimentalCycles";
import Types "types";

actor class () {

  stable var profiles : Trie.Trie<Principal, Types.Profile> = Trie.empty();

  // Read profile
  public shared query (msg) func readBusinessProfile() : async Result.Result<Types.Profile, Types.Error> {
    // Get caller principal
    let callerId = msg.caller;

    // Reject AnonymousIdentity
    if (Principal.toText(callerId) == "2vxsx-fae") {
      return #err(#NotAuthorized);
    };

    let result = Trie.find(
      profiles, //Target Trie
      key(callerId), // Key
      Principal.equal // Equality Checker
    );
    return Result.fromOption(result, #NotFound);
  };

  public shared (msg) func createBusinessProfile(profile : Types.ProfileUpdate) : async Result.Result<(), Types.Error> {
    // Get caller principal
    let callerId = msg.caller;

    // Reject AnonymousIdentity
    if (Principal.toText(callerId) == "2vxsx-fae") {
      return #err(#NotAuthorized);
    };

    // Associate user profile with their principal
    let userProfile : Types.Profile = {
      bio = profile.bio;
      image = profile.image;
      id = callerId;
    };

    let (newProfiles, existing) = Trie.put(
      profiles, // Target trie
      key(callerId), // Key
      Principal.equal, // Equality checker
      userProfile,
    );

    switch (profile.image) {
      case null {};
      case (?v) {
        var fileName = "/images/";
        fileName := Text.concat(fileName, Principal.toText(callerId));
        fileName := Text.concat(fileName, "/");
        fileName := Text.concat(fileName, v.fileName);
        let sha256 : ?Blob = null;

        // let storeResult = await AssetCanister.store({
        //     key = fileName;
        //     content_type = v.filetype;
        //     content_encoding = "identity";
        //     content = v.data;
        //     sha256 = sha256;
        // });
      };
    };

    // If there is an original value, do not update
    switch (existing) {
      // If there are no matches, update profiles
      case null {
        profiles := newProfiles;
        #ok(());
      };
      // Matches pattern of type - opt Profile
      case (?v) {
        #err(#AlreadyExists);
      };
    };
  };

  private func key(x : Principal) : Trie.Key<Principal> {
    return { key = x; hash = Principal.hash(x) };
  };

  private func keyText(x : Text) : Trie.Key<Text> {
    return { key = x; hash = Text.hash(x) };
  };

  public query func remaining_cycles() : async Nat {
    return Cycles.balance();
  };
};
