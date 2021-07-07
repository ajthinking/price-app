import Aggregate from './nodes/Aggregate';
import Clone_ from './nodes/Clone_';
import Comment from './nodes/Comment';
import Create from './nodes/Create';
import CreateGrid from './nodes/CreateGrid';
import CreateAttribute from './nodes/CreateAttribute';
import CreateCSV from './nodes/CreateCSV';
import CreateJSON from './nodes/CreateJSON';
import CreateSequence from './nodes/CreateSequence';
import Evaluate from './nodes/Evaluate';
import FilterDuplicates from './nodes/FilterDuplicates';
import Flatten from './nodes/Flatten';
import Group from './nodes/Group';
import Inspect from './nodes/Inspect';
import Log from './nodes/Log';
import Map from './nodes/Map';
import OutputProvider from './nodes/OutputProvider';
import RegExpFilter from './nodes/RegExpFilter';
import Sample from './nodes/Sample';
import Sort from './nodes/Sort';
import Sleep from './nodes/Sleep';
import ThrowError from './nodes/ThrowError';
import { SerializedNodeModel } from '../types/SerializedNodeModel';
export default class ServerNodeFactory {
    protected static nodes: {
        Aggregate: typeof Aggregate;
        Clone_: typeof Clone_;
        Comment: typeof Comment;
        Create: typeof Create;
        CreateAttribute: typeof CreateAttribute;
        CreateCSV: typeof CreateCSV;
        CreateGrid: typeof CreateGrid;
        CreateJSON: typeof CreateJSON;
        CreateSequence: typeof CreateSequence;
        Evaluate: typeof Evaluate;
        FilterDuplicates: typeof FilterDuplicates;
        Flatten: typeof Flatten;
        Group: typeof Group;
        Inspect: typeof Inspect;
        Log: typeof Log;
        Map: typeof Map;
        OutputProvider: typeof OutputProvider;
        RegExpFilter: typeof RegExpFilter;
        Sample: typeof Sample;
        Sleep: typeof Sleep;
        Sort: typeof Sort;
        ThrowError: typeof ThrowError;
    };
    static find(type: string): any;
    static all(): (typeof Aggregate | typeof Clone_ | typeof Comment | typeof Create | typeof CreateGrid | typeof CreateAttribute | typeof CreateCSV | typeof CreateJSON | typeof CreateSequence | typeof Evaluate | typeof FilterDuplicates | typeof Flatten | typeof Group | typeof Inspect | typeof Log | typeof Map | typeof OutputProvider | typeof RegExpFilter | typeof Sample | typeof Sort | typeof Sleep | typeof ThrowError)[];
    static make(type: string): any;
    static hydrate(node: SerializedNodeModel, diagram?: any): any;
}
