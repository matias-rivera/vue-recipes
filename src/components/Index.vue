<template>
  <div class="index container">
    <div class="card" v-for="recipe in recipes" :key="recipe.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteRecipe(recipe.id)">delete</i>
        <h2 class="indigo-text">{{recipe.title}}</h2>
        <ul class="ingredients">
          <li v-for="(ingredient,index) in recipe.ingredients" :key="index">
            <span class="chip">{{ingredient}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      recipes: [
        {title: 'Pan con Queso',slug:'pan_con_queso',
        ingredients:['pan','queso','tomate'],id:'1'},
        {title: 'Café con Leche',slug:'cafe_con_leche',
        ingredients:['cafe','leche','azúcar'],id:'2'}
      ]
    }
  },
  methods:{
    deleteRecipe(id){
      this.recipes = this.recipes.filter(recipe => {
        return recipe.id != id
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.index{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap:30px;
  margin-top:60px;
}

.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .ingredients{
  margin: 30px auto;
}

.index .ingredients li{
  display: inline-block;
}

.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #e7e7e7e7;
  font-size: 1.4em;
}
</style>
