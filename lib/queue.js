const superagent = require('./superagent')

const isGeneratorFunction = n => n === 'GeneratorFunction'
const isPromise = n => n === 'Promise'
const isAsyncFunction = n => n === 'AsyncFunction'

const isAsyncTask = t => {
  if(!t) return false
  const cor = t.constructor
  const n = cor.name || cor.displayName
  return isGeneratorFunction(n) || isPromise(n) || isAsyncFunction(n) || t.then !== undefined
}

class Queue {
  constructor(size) {
    this.tasks = []
    this.size = size || 20 // 最高并发数，默认 20
  }

  get() {
    return this.tasks.length
  }
  
  set(task) {
    this.tasks.push(task)
    return this
  }

  run() {
    // 任务并发
    const num = Math.min(this.size, this.tasks.length)
    if(num > 0) {
      for(let i = 0; i < num; i++) {
        // 推入执行栈的任务从队列中删掉
        this.excute(this.tasks.splice(0, num)[i])
      }
    }
  }

  excute(task) {
    try {
      task && task()
    } finally {
      this.run()
    }
  }
}

module.exports = Queue 

const q = new Queue(3)

async function promise() {
  await superagent('https://api.zhihu.com/remix/literature/1140310150807224320/sections/1140314592818483200/manuscript')
}

for(let i = 0; i < 20; i++) {
  q.set(promise)
}

// q.run()

const p = new Promise((resolve, reject) => {
  return reject(123)
})

try {
  p.then(res => {
    console.log('resolve', res)
  }, res => {
    console.log('reject', res)
    throw new Error(res)
  }).catch(err => {
    console.log('error', err)
    throw new Error(err)
  })
} catch(e) {
  console.log('eeeeee', e)
}

