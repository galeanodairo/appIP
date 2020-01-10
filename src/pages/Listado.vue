<template>
    <q-page class="bg-grey-3  q-mb-md">
        <div class="q-pa-md">
           
            <q-table
            title="Listado de IPS"
            :dense="$q.screen.lt.md"
            :data="data"
            :columns="columns"
            row-key="id"
            selection="single"
            :selected.sync="selected"
            :filter="filter"
            no-data-label="Aun no se han registrado datos"
            no-results-label="No hay resultado para su busqueda"
            >
                <template v-slot:top-right>
                    <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                    </q-input>
                </template>
            </q-table>
        </div>

        <div class="q-pa-md q-gutter-y-md column items-start" v-if="selected[0]">
            <q-btn-group push>
            <q-btn push label="Eliminar" icon="delete" @click="eliminar(selected[0].id)" />
            <q-btn push label="Editar" icon="edit" />
            </q-btn-group>
        </div>
    </q-page>
</template>

<script>
import { db } from "boot/firebase";
import { async } from 'q';
export default {
    methods:{
        async cargarDatos(){
            try {
                this.$q.loading.show()
                const query = await db.collection('funcionarios').get();
                query.forEach(element=>{
                   let funcionario = {
                        nombre:element.data().nombre,
                        ip:element.data().ip,
                        secretaria:element.data().secretaria,
                        oficina:element.data().oficina,
                        dispositivo:element.data().dispositivo,
                        id:element.id
                    }
                   this.data.push(funcionario);
                    let otros=element.data().otrosDispositivos;
                    let c=0;
                    otros.forEach(item=>{
                        let dispositivo = {
                            nombre:element.data().nombre,
                            ip:item.ip,
                            secretaria:element.data().secretaria,
                            oficina:element.data().oficina,
                            dispositivo:item.nombre,
                            id:element.id+'-'+c
                        }
                        this.data.push(dispositivo);
                        c++;

                    });
                   
                })
                
            } catch (error) {
                console.log(error);
            }finally{
              this.$q.loading.hide();  
            }
        },//Fin de cargar Datos
        eliminar(id){            
            this.$q.dialog({
                cancel: true,
                persistent: true,
                title: 'Advertencia',
                message: 'Al selecionar Eliminar se borrará todo el registro pertneciente al funcionario'
            }).onOk(async() => {
                const key=id.split("-")[0];
                try {
                    this.$q.loading.show();
                    const query = await db.collection('funcionarios').doc(key).delete();
                } catch (error) {
                    console.log(error);
                }finally{
                    this.$q.loading.hide();
                    this.data=[];
                    this.cargarDatos();
                }

            })

        },//Fin de Eliminar
    },
    data(){
        return{
            filter:'',
            selected:[],
            columns: [
                {
                name: 'desc',
                required: true,
                label: 'Funcionario',
                align: 'left',
                field: row => row.nombre,
                format: val => `${val}`,
                sortable: true
                },
                { name: 'dispositivo', align: 'left', label: 'Dispositivo', field: 'dispositivo', sortable: true },
                { name: 'ip', align: 'left', label: 'Dirección IP', field: 'ip', sortable: true },
                { name: 'secretaria', align: 'left', label: 'Secretaría', field: 'secretaria', sortable: true },
                { name: 'oficina', align: 'left', label: 'Oficina', field: 'oficina', sortable: true },
            ],
            data:[]
        }
    },
    created(){
        this.data=[];
        this.cargarDatos();
    }
    
}
</script>