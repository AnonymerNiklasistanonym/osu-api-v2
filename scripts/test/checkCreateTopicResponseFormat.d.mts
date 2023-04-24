// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { CreateTopicResponseFormat } from "../types/createTopic.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkCreateTopicResponseFormatObject = (createTopicResponseFormat: Readonly<CreateTopicResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(createTopicResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(createTopicResponseFormat.topic, { checkedKey: "topic", checkedKeys })
    genericCheckIfObject(createTopicResponseFormat.post, { checkedKey: "post", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(createTopicResponseFormat, checkedKeys, options)
}
