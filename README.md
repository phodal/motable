# Motable
 
> A Angular dragable-reorder Table plugin with ngx-datatable & ngx-datatable

Usage
---

1.install

```
yarn add motable
```
2.import module

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MotableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

3.Use it

component:

```typescript
  public rows: Array<any> = [];
  public columns: Array<any> = [];
  public placeholder: string;

  ngOnInit(): void {
    this.placeholder = '搜索...';
    this.columns = [
      {name: '用途', prop: 'usage'},
      {name: '用途2', prop: 'usage2'}
    ];

    this.rows = [
      {
        'usage': '客户付款 1',
        'usage2': '客户付款 1 用途2'
      }, {
        'usage': '客户付款 2',
        'usage2': '客户付款 2 用途2'
      }
    ];
  }
```

template:

```html
<app-motable
  [id]="'maintain'"
  [rows]="rows"
  [placeholder]='placeholder'
  [columns]="columns"></app-motable>
``` 

``

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

© 2018 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.
