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
    this.size = size // 最高并发数
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
    for(let i = 0; i < num; i++) {
      this.excute(this.tasks[i])
    }
  }

  excute(task) {
    try {
      task && task()
    } finally {
      this.tasks.shift()
      this.run()
    }
  }
}

const q = new Queue(3)

function func() { console.log(123) }

for(let i = 0; i < 3; i++) {
  q.set(func)
}

q.run()