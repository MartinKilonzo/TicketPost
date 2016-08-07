'use strict';

/**
 * An implementation of mergesort that sorts a given list in a specified order by comparing the attributes given in the optional third argument.
 *
 * @param {Array[String]} list      - The list to be sorted.
 * @param {String} order            - The order in which to sort the list by.
 * @param {Function} comparator     - A function that will be used to compare the values. Returns true if the first value is greater than or equal to the second, and false otherwise.
 * @param {Array} attributeList     - The attributes of the objects in list with whcih to compare (optional)
 */
let sortData = (list, order, comparator, attributeList) => {
  this.sortAscending = order === 'ascending' ? true : false;
  this.attributeList = typeof attributeList !== 'undefined' ? attributeList : [];
  this.comparator = comparator;
  return mergeSort(list);
}

let mergeSort = (list) => {
  if (list.length < 2) {
    return list;
  }
  var leftList = mergeSort(list.slice(0, (list.length + 1) / 2));
  var rightList = mergeSort(list.slice((list.length + 1) / 2, list.length));
  if (this.sortAscending) return mergeListsAscending(leftList, rightList);
  else return mergeListsDescending(leftList, rightList);

};

let mergeListsDescending = (leftList, rightList) => {
  //TODO implement this.order
  var ret = [];
  var l = 0;
  var r = 0;
  while (l < leftList.length && r < rightList.length) {
    let lVal = leftList[l];
    let rVal = rightList[r];
    this.attributeList.forEach(attr => {
      lVal = lVal[attr];
      rVal = rVal[attr];
    });
    if (this.comparator(lVal, rVal)) {
      ret.push(leftList[l++]);
    } else {
      ret.push(rightList[r++]);
    }
  }
  while (l < leftList.length) {
    ret.push(leftList[l++]);
  }
  while (r < rightList.length) {
    ret.push(rightList[r++]);
  }
  return ret;
};

let mergeListsAscending = (leftList, rightList) => {
  //TODO implement this.order
  var ret = [];
  var l = 0;
  var r = 0;
  while (l < leftList.length && r < rightList.length) {
    let lVal = leftList[l];
    let rVal = rightList[r];
    this.attributeList.forEach(attr => {
      lVal = lVal[attr];
      rVal = rVal[attr];
    });
    if (!this.comparator(lVal, rVal)) {
      ret.push(leftList[l++]);
    } else {
      ret.push(rightList[r++]);
    }
  }
  while (l < leftList.length) {
    ret.push(leftList[l++]);
  }
  while (r < rightList.length) {
    ret.push(rightList[r++]);
  }
  return ret;
};

module.exports = sortData;
