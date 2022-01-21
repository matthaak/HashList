# HashList
ServiceNow server-side implementation of Java LinkedHashSet with special list parsing and GlideElement binding abilities

HashList meets two needs:
* Easy way to deal with ServiceNow Glide List fields and variables
* Consistent way to make/update ordered lists of unique items, like a LinkedHashSet in Java

Supporting these needs, it can also parse sloppy delimited strings and clean up duplicates.

HashLists do not have to be bound to a Glide List field or variable, though that is probably their most common use case.

## Setup
Copy HashList.js into a global or scoped Script Include. Make sure the Script Include is accessible from all application scopes.

## Usage
   
    // Add someone to a Watch list
    gr = new GlideRecord('incident');
    gr.get('number', 'INC0000001');
    new HashList(gr.watch_list).add('6816f79cc0a8016401c5a33be04be441'); 
    gr.update();

    // Remove someone from a Watch list
    gr = new GlideRecord('incident');
    gr.get('number', 'INC0000001');
    new HashList(gr.watch_list).remove('6816f79cc0a8016401c5a33be04be441');
    gr.update();

## Constructors

    new HashList();
    
Constructs an empty HashList unbound to any Glide List field and variable.

    new HashList(glideElement);
    
Constructs an empty HashList bound to the given Glide List field or variable () and populated with its current value.

    new HashList(string);

Constructs a HashList populated with the string split by comma, duplicates and empty values removed, and each value trimmed (whitespace padding removed from beginning or end of each value).

    new HashList(string, delimiter);
    
Constructs a HashList as with the string constructor above but uses the given delimiter string (one or more characters, case sensitive) instead of comma. Note that delimiter could also be used with a glideElement if operating on a non-Glide List field or variable that houses delimited values.

## Methods

### add
    add(e)
    
Adds the specified element to this list if it is not already present. If this list already contains the element, the call leaves the list unchanged and returns false.

If this list is bound to a Glide List field or variable (i.e. this list was constructed with glideElement passed-in) it will be updated (the glideElement object value itself, not the record in the database).

Parameters:

e - element to be added to this set; usually a string. A non-string can be added to the list and later retrieved via toArray(). However, it will be evaluated as a string for purposes of the contains() and remove() methods. Also, clone() will convert the element to a string in the resulting HashList.

Returns:

true if this set did not already contain the specified element

### clear
    clear()
    
Removes all of the elements from this list. The list will be empty after this call returns.

If this list is bound to a Glide List field or variable (i.e. this list was constructed with glideElement passed-in) it will be updated to an empty value (the glideElement object value itself, not the record in the database) and will continue to be bound to this list.

### clone
    clone()
    
Returns a copy of this HashList instance in which any non-string elements are converted to a string. If this list is bound to a Glide List field or variable (i.e. this list was constructed with glideElement passed-in) the cloned copy will NOT retain this binding.

Returns:

another HashList copied from this list

### contains
    contains(e)
    
Returns true if this list contains the specified element. The specified element and all the elements already in this list are evaluated as strings to determine if there is a match.

Parameters:

e - element whose presence in this list is to be tested

Returns:

true if this list contains the specified element

### isEmpty
    isEmpty()

Returns true if this list contains no elements.

Returns:

true if this list contains no elements

### remove
    remove(e)
    
Removes the specified element from this list if it is present. The specified element and all the elements already in this list are evaluated as strings to determine if there is a match. Returns true if this list contained the element. (This list will not contain the element once the call returns.)

If this list is bound to a Glide List field or variable (i.e. this list was constructed with glideElement passed-in) it will be updated (the glideElement object value itself, not the record in the database).

Parameters:

e - element to be removed from this list, if present

Returns:

true if the list contained the specified element

### size
    size()

Returns the number of elements in this list.

Returns:

the number of elements in this list

### toString
    toString()
    
Returns the list as a string; each element is separated by comma or the delimiter passed into this HashList instance's constructor. This list is not modified in any way by calling toString.

Returns:

a string representation of this list

### toArray
    toArray()
    
Returns an array of all of the elements, as whatever types they were when they were added. The resultant array is a shallow copy of the internal array used to store this list's elements. This presents no concerns if this list is all strings as is typical. However, if any non-objects have been added to this list, the resultant array will continue to reference the same objects.

Returns:

this list as an array

