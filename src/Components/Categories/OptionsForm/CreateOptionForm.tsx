import React, { useEffect } from "react";
import { Container, Modal, Stack, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { CloseBtn, CreateOptionFormPaper } from "./CreateOptionsForm.styled";
import { Delete, PlaylistAdd, Save, SaveAlt } from "@mui/icons-material";
import { useAppDispatch } from "../../../store/hooks";
import {
  createOptions,
  getAllOptions,
  removeOption,
  updateOption,
} from "../../../store/options/operations";
import { IOptionsFormState, OptionsAction } from "../../../interfaces/options";
import OptionButton from "./OptionButton";

interface IProps {
  optionsFormState: IOptionsFormState;
  handleClose: () => void;
}

export const CreateOptionForm: React.FC<IProps> = ({
  handleClose,
  optionsFormState,
}) => {
  const dispatch = useAppDispatch();
  const [optionName, setOptionName] = React.useState<string>("");
  const [options, setOptions] = React.useState<
    { id: string; value: string; isChange: boolean }[]
  >([{ id: "", value: "", isChange: false }]);

  useEffect(() => {
    if (optionsFormState.actions === OptionsAction.create) {
      setOptions([{ id: "", value: "", isChange: false }]);
    }
    console.log(optionsFormState.options);
    
    if (optionsFormState.options && typeof optionsFormState.options === "object") {
      const optionsList = optionsFormState.options.children.map((el) => ({
        value: el.name,
        id: el.id,
        isChange: false,
      }));
      setOptions(optionsList);
    }
  }, [optionsFormState]);

  const handleOnChange = (value: string, i: number) => {
    const newOptions = [...options];
    newOptions[i] = { ...newOptions[i], value, isChange: true };
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    const newOptions = options.concat({ id: "", value: "", isChange: false });
    setOptions(newOptions);
  };

  const handleSave = () => {
    dispatch(
      createOptions({
        name: optionName,
        parentId: null,
      })
    ).then((response) => {
      const parentId = response.payload.id;
      const promisesArray = options.map((option) =>
        dispatch(
          createOptions({
            name: option.value,
            parentId: parentId,
          })
        )
      );
      Promise.allSettled(promisesArray).then((results) => {
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            console.log(result.value.payload);
          } else {
            console.error("Обещание было отклонено:", result.reason);
          }
        });
        setOptionName("");
        setOptions([{ id: "", value: "", isChange: false }]);
        dispatch(getAllOptions());
      });
    });

    options.forEach((option) => {
      console.log({
        name: option,
        parentId: "parentId",
      });
    });
  };

  const handleDelete = (id: string, value: string) => {
    if (optionsFormState.actions === OptionsAction.create) {
      setOptions((options) => options.filter((el) => el.value !== value));
    }
    if (optionsFormState.actions === OptionsAction.update) {
      dispatch(removeOption(id)).then((res) => {
        console.log("RES", res);
        if (res.meta.requestStatus === "fulfilled") {
          setOptions((options) => options.filter((el) => el.id !== id));
        }
      });
      
    }
  };

  const handleDeleteAll = () => {
    if (typeof optionsFormState.options === "object") {
      dispatch(removeOption(optionsFormState.options.id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setOptions([{ id: "", value: "", isChange: false }]);
          handleClose();
          dispatch(getAllOptions());
        }
      });
    }
  };

  const handleUpdate = (id: string, value: string, index: number) => {
    if (typeof optionsFormState.options !== "object") return;
    if (id) {
      const data = {
        name: "",
        parentId: optionsFormState.options.id,
        toRoot: true,
      };
      dispatch(updateOption({ id, data })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setOptions(options => options.map((option => {
            if (option.id === id) {
              return { id: option.id, value: option.value, isChange: false }
            }
            return option;
          })));
        }
      });
    } else {
      const data = {
        name: value,
        parentId: optionsFormState.options.id,
      };
    dispatch(createOptions(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {

        console.log('RESPONSE', res);
        
        setOptions(options => options.map(((option,i) => {
          if (i === index) {
            return { id: res.payload.id, value: res.payload.name, isChange: false }
          }
          return option;
        })));
      }
    });
  };
}

  return (
    <Modal
      open={optionsFormState.options ? true : false}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container sx={{ outline: "none" }}>
        <CreateOptionFormPaper elevation={0}>
          <CloseBtn onClick={handleClose}>
            <ClearIcon />
          </CloseBtn>
          <Stack spacing={2} mt={4}>
            <Stack direction={"row"} spacing={2}>
              <TextField
                value={optionName}
                onChange={(e) => setOptionName(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="option name"
              />

              <OptionButton
                title="Додати option"
                handle={handleAddOption}
                icon={PlaylistAdd}
                variant="outlined"
              />

              <OptionButton
                title="Зберегти"
                handle={handleSave}
                icon={Save}
                variant="outlined"
              />

              {optionsFormState.actions === OptionsAction.create || (
                <OptionButton
                  title="Видалити всю групу"
                  handle={handleDeleteAll}
                  icon={Delete}
                  variant="outlined"
                />
              )}
            </Stack>
            {options.map((option, i) => {
              return (
                <Stack direction="row" justifyContent="space-between">
                  <TextField
                    key={`${option.id}${i}`}
                    sx={{ flex: "1 0" }}
                    value={option.value}
                    autoFocus
                    onChange={(e) => handleOnChange(e.target.value, i)}
                    margin="dense"
                    label="option item"
                    variant="standard"
                  />
                  {OptionsAction.create === optionsFormState.actions || (
                    <OptionButton
                      disabled={!option.isChange}
                      title="Зберегти"
                      handle={() => handleUpdate(option.id, option.value, i)}
                      icon={SaveAlt}
                    />
                  )}
                  <OptionButton
                    title="Видалити"
                    handle={() => handleDelete(option.id, option.value)}
                    icon={Delete}
                  />
                </Stack>
              );
            })}
          </Stack>
        </CreateOptionFormPaper>
      </Container>
    </Modal>
  );
};
