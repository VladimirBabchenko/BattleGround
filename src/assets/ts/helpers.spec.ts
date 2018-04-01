import "jasmine";
import {forTest} from "./helpers";

describe("forTest", function() {
    it("it should return 2", function() {
      expect(forTest()).toBe(2);
    });
  });