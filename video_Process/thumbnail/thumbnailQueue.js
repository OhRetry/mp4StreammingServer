module.exports = function(size){
    this.size = size;
    this.queue = [];
    this.cnt = 0;
    return this;
}
/**
 * push new element. it will delete the oldest one when queue is full.
 * if it delete the oldest one, return the oldest one
 * if it delete nothing, return undefined.
 * @param {object} element
 * @returns {object}
 */
module.exports.prototype.push = function(element){
    let ret;
    if(this.queue[this.cnt]){
        ret = this.queue[this.cnt]
    }
    this.queue[this.cnt] = element;
    this.cnt++;
    if(this.cnt/this.size == 1)
        this.cnt = 0;
    return ret;
}