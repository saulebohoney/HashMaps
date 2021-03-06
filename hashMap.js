'use strict';
class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      let index = i % this._capacity;
      let slot = this._slots[index];

      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('No Key');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);

    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._slots = [];
    //for a slot in the oldSlots
    for (const slot of oldSlots) {
      //if slot is not undefined or if slot is not deleted
      if (slot !== undefined && !slot.deleted) {
        //set the key and value for that slot
        this.set(slot.key, slot.value);
      }
    }
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('no key');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

// const hm2 = new HashMap;

// hm2.set('Hobbit', 'Bilbo');
// hm2.set('Hobbit', 'Frodo');
// hm2.set('Wizard', 'Gandolf');
// hm2.set('Human', 'Aragon');
// hm2.set('Elf', 'Legolas');
// hm2.set('Maiar', 'The Necromancer');
// hm2.set('Maiar', 'Sauron');
// hm2.set('RingBearer', 'Gollum');
// hm2.set('LadyOfLight', 'Galadriel');
// hm2.set('HalfElven', 'Arwen');
// hm2.set('ShepherdOfTheTrees', 'Treebeard');
// console.log('before', hm2);
//
// hm2.get('Hobbit');
// hm2.remove('Elf');
// console.log('after', hm2);

////////////////////Exercisies///////////////
function isPalindrome(string) {

  //divide count
  //rule out more than 1 odd

  let stringSplit = string.split('');
  const letters = [];
  stringSplit.forEach(function(l) {
    let count = 0;
    for (let i = 0; i < stringSplit.length; i++) {
      if (l === stringSplit[i]) {
        count += 1;
      }
      letters[l] = count;
    }
  });

  let count2 = 0;
  console.log(letters['h']);
  for (let j of Object.keys(letters)) {
    console.log(letters[j]);
    if (letters[j] % 2 !== 0) {
      count2 += 1;
    }
    if (count2 > 1) {
      return false;
    }
  }
  return true;
}
console.log('letter count', isPalindrome('admam'));


// function countLetter(string) {
//   let count = 0;
//   for (let i = 0; i < string.length; i++) {
//     if (string.charAt(i) === 'e') {
//       count++
//     }
//   }
//   return count;
// }
// console.log(countLetter('effe'));
