/**
 * Created by kevin on 28/12/2016.
 */
export function buildOptions(options, sessionToken) {
  Object.assign(options || {}, {sessionToken});
}
export function createModel(ParseObject, sessionToken = '') {
  const looksLikeLegitParseObject = (
    ParseObject && typeof ParseObject === 'function' && ParseObject.className
  );
  if (!looksLikeLegitParseObject) {
    throw new Error('createModel() requires a class based on Parse.Object');
  }
  if (!sessionToken) {
    return ParseObject;
  }
  return ParseObject.extend({
    save(target, options){
      return ParseObject.prototype.save.call(this, target, buildOptions(options, sessionToken));
    },
    saveAll(list, options){
      return ParseObject.prototype.saveAll.call(this, list, buildOptions(options, sessionToken));
    },
    destroy(options){
      return ParseObject.prototype.destroy.call(this, buildOptions(options, sessionToken));
    },
    destroyAll(list, options){
      return ParseObject.prototype.destroyAll.call(this, list, buildOptions(options, sessionToken));
    },
    fetch(options){
      return ParseObject.prototype.fetch.call(this, buildOptions(options, sessionToken));
    }
  });
}

