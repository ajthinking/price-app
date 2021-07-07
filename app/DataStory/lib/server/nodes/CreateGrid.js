"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Feature_1 = require("../../Feature");
const ServerNode_1 = __importDefault(require("../ServerNode"));
const NodeParameter_1 = __importDefault(require("../../NodeParameter"));
class CreateGrid extends ServerNode_1.default {
    constructor(options = {}) {
        super(Object.assign({ 
            // Defaults
            name: 'CreateGrid', summary: 'Create a set of objects with coordinates x and y', category: 'Reader', defaultInPorts: [], defaultOutPorts: ['Output'] }, options));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let type = this.getParameterValue('grid_type');
            let gridMinX = parseFloat(this.getParameterValue('grid_min_x'));
            let gridMinY = parseFloat(this.getParameterValue('grid_min_y'));
            let gridMaxX = parseFloat(this.getParameterValue('grid_max_x'));
            let gridMaxY = parseFloat(this.getParameterValue('grid_max_y'));
            let gridSizeX = parseInt(this.getParameterValue('grid_size_x'));
            let gridSizeY = parseInt(this.getParameterValue('grid_size_y'));
            let gridSpacingX = parseFloat(this.getParameterValue('grid_spacing_x'));
            let gridSpacingY = parseFloat(this.getParameterValue('grid_spacing_y'));
            if (gridMaxX && gridMaxY) {
                gridSizeX = Math.ceil((gridMaxX - gridMinX) / gridSpacingX);
                gridSizeY = Math.ceil((gridMaxY - gridMinY) / gridSpacingY);
            }
            let features = [];
            for (let x = 0; x < gridSizeX; x++) {
                for (let y = 0; y < gridSizeY; y++) {
                    let point = {
                        x: gridMinX + x * gridSpacingX,
                        y: gridMinY + y * gridSpacingY,
                    };
                    if (type == 'points') {
                        features.push(new Feature_1.Feature(point));
                    }
                    if (type == 'boxes') {
                        features.push(new Feature_1.Feature({
                            x_min: point.x,
                            y_min: point.y,
                            x_max: point.x + gridSpacingX,
                            y_max: point.y + gridSpacingY,
                        }));
                    }
                }
            }
            this.output(features);
        });
    }
    getParameters() {
        return [
            ...super.getParameters(),
            NodeParameter_1.default.select('grid_type').withOptions(['points', 'boxes']).withValue('points'),
            NodeParameter_1.default.number('grid_min_x').withValue(0),
            NodeParameter_1.default.number('grid_min_y').withValue(0),
            NodeParameter_1.default.number('grid_max_x').withValue(10),
            NodeParameter_1.default.number('grid_max_y').withValue(10),
            NodeParameter_1.default.number('grid_size_x').withDescription('Ignored if grid_max_x is set'),
            NodeParameter_1.default.number('grid_size_y').withDescription('Ignored if grid_max_y is set'),
            NodeParameter_1.default.number('grid_spacing_x').withValue(1),
            NodeParameter_1.default.number('grid_spacing_y').withValue(1),
        ];
    }
}
exports.default = CreateGrid;
