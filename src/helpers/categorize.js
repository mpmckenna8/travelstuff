
let categorizeItems = function(itemarray) {
  var itemCats = {};

  for ( let o of itemarray ) {
  //  console.log(o.category === null)
    if(itemCats[o.category]) {
        itemCats[o.category].push(o)
    }
    else {
      if(o.category === null) {
          if(itemCats['other']){
            itemCats['other'].push(o)
          }
          else itemCats['other'] = [o];
      }
      else{
        if(o.category === 'comestable') {
          if(itemCats['comestables']){
            itemCats['comestables'].push(o)
          }
          else{
            itemCats['comestables'] = [o]
          }

        }
        else itemCats[o.category] = [o];
      }
    }
  }
  return itemCats;

}

export default categorizeItems;
