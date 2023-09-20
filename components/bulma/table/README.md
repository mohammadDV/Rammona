### Table

example

```html
<BulmaTable
    height="100px"
    :headers="['img', 'title', 'created_at', 'active', 'like']"
>
    <tr v-for="item in sampleData" :key="item.id">
        <td><img :src="item.imgSrc" height="100px" width="100px" /></td>
        <td>{{ item.title }}</td>
        <td>{{ item.created_at }}</td>
        <td>{{ item.active }}</td>
        <td>{{ item.like }}</td>
    </tr>
</BulmaTable>
```