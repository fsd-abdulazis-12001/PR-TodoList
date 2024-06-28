import { Autocomplete } from "@mui/material";
import UsePokemon from "../../../hooks/pokemon/usePokemon";
import TextField from "@mui/material/TextField";
function AutoComplete({value, onChange}) {
    const { allPokeNameList } = UsePokemon();
    return (
        <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            options={allPokeNameList}
            sx={{ width: 300 }}
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
            renderInput={(params) => <TextField {...params} label="Masukkan Nama Pokemon" />}
        />
    );
}

export default AutoComplete