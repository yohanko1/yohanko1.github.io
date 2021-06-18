---
slug: "go-oop"
title: "OOP in Go"
summary: "How embedding works in Go"
date: 2021-06-15T15:46:33+09:00
tags:
- go
- oop
- embedding
draft: false
---
My first programming language was Java. 
Last year, I started playing around with Go. 
Coming from OOP background, I missed having classes and inheritance.

Go uses embedding to organize 'objects' efficiently. There are three ways to use embedding. (Composition over inheritance!)

# Embedding struct in struct
Instead of inheritance, Go uses embedding. 
```go
type engine struct {
    cylinderCount int
}

type car struct {
    engine          // struct embedding
    brand string
}

c := car{}
c.brand = "bmw"
c.cylinderCount = "4" // accessing embeeded field
```

So, what happens if there is a cycle in your struct definition?
```go
// 1
type a struct {
    a
    q string
}

// 2 
type b struct {
    c
}
type c struct {
    b
}
```
Both examples will result in compilation error: `invalid recursive type`

Does it mean you can't define a recursive struct? Use a pointer.
```go
type a struct {
    q string
    *a
}
```

In practice, imagine something like a shared `counter` which embeds `sync.Mutex struct` 
```go
type counter struct {
    sync.Mutex
    buffer []byte
    count int
}
```

# Embedding interface in interface
Interface embedding is straightforward.

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

// interface embedding
type ReadWriter interface {
    Reader
    Writer
}
```

What happens if we are embedding interfaces and there are overlapping functions?
```go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Read(p []byte) (n int, err error) // function overlap
    Write(p []byte) (n int, err error)
}

// ?? 
type ReadWriter interface {
    Reader
    Writer
}
```
As of Go 1.15, this results in `duplicate method Read`

# Embedding interface in struct
This is the most interesting part of embedding.

Let's take a look at a simple example.
```go
type greeter interface {
    hi()
}

type person struct {
    greeter
}

```
Interface is satisfied as long as a struct implements all functions in that interface.

To `person` to embed `greeter` interface, `person` can holds any struct that implements `greeter` interface.

It's not immediately obvious how this is useful. Take a look at real usage from `sort`

```go
// sort.Interface 
type Interface interface {
    // Len is the number of elements in the collection.
    Len() int
    // Less reports whether the element with
    // index i should sort before the element with index j.
    Less(i, j int) bool
    // Swap swaps the elements with indexes i and j.
    Swap(i, j int)
}
```

`sort.Interface` exposes functions that help users to modify behavior of sort. 

Let's take a look at how `sort.Reverse` works.

```go
type reverse struct {
    sort.Interface
}

// intercepts Less() from sort.Interface 
func (r reverse) Less(i, j int) bool {
    return r.Interface.Less(j,i)
}

func Reverse(data sort.Interface) sort.Interface {
    return &reverse{data}
}
```

`reverse` struct simply embeds `sort.Interface` and intercepts `Less()` to change behavior of the sorting.  

That concludes embedding in Go.
