<template>
    <div class="add-recipe container"> 
        <h2 class="center-align indigo-text">Añadir Receta</h2>
        <form @submit.prevent="AddRecipe">
            <div class="field title">
                <label for="title">Título de Receta</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ing,index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingrediente:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Añadir ingrediente (con tecla tab)</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="AddIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Añadir Receta</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
    name:'AddRecipe',
    data(){
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug:null
        }
    },
    methods:{
        AddRecipe(){
            if(this.title){
                this.feedback = null;
                //slug
                this.slug = slugify(this.title,{
                    replacement: '_',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower:true
                });
                db.collection('recipes').add({
                    title: this.title,
                    slug: this.slug,
                    ingredients: this.ingredients
                }).then(() => {
                    this.$router.push({name: 'Index'})
                }).catch(err => {
                    console.log(err)
                });
            }else{
                this.feedback = 'You must enter a title';
            }
        },
        AddIng(){
            if(this.another){
                this.ingredients.push(this.another);
                this.another = null;
                this.feedback = null;
            }else{
                this.feedback = 'You must enter a value to add ingredient';
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>

<style >
    .add-recipe{
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }

    .add-recipe h2{
        font-size: 2em;
        margin: 20px auto;
    }

    .add-recipe .field{
        margin: 20px auto;
        position: relative;
    }

    .add-recipe .delete{
        position: absolute;
        right:0;
        bottom: 16px;
        color: #aaa;
        font-size: 1.4em;
        cursor: pointer;
    }
</style>
