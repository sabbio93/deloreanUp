module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "297f99a1c3de144a3a6b"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__("./node_modules/webpack/hot/log.js");

	if(unacceptedModules.length > 0) {
		log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if(!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if(typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if(numberIds)
			log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog = (logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if(shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if(shouldLog(level)) {
		if(level === "info") {
			console.log(msg);
		} else if(level === "warning") {
			console.warn(msg);
		} else if(level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?1000":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if(true) {
	var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	var log = __webpack_require__("./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if(module.hot.status() === "idle") {
			module.hot.check(true).then(function(updatedModules) {
				if(!updatedModules) {
					if(fromUpdate) log("info", "[HMR] Update applied.");
					return;
				}
				__webpack_require__("./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
				checkForUpdate(true);
			}).catch(function(err) {
				var status = module.hot.status();
				if(["abort", "fail"].indexOf(status) >= 0) {
					log("warning", "[HMR] Cannot apply update.");
					log("warning", "[HMR] " + err.stack || err.message);
					log("warning", "[HMR] You need to restart the application!");
				} else {
					log("warning", "[HMR] Update failed: " + err.stack || err.message);
				}
			});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}

/* WEBPACK VAR INJECTION */}.call(exports, "?1000"))

/***/ }),

/***/ "./src/Plugins/DocNodesFinder/staticCode.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllNodes", function() { return getAllNodes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_DocNode__ = __webpack_require__("./src/model/DocNode.js");


const docNodes = [new __WEBPACK_IMPORTED_MODULE_0__model_DocNode__["a" /* default */]('127.0.0.1', 5555), new __WEBPACK_IMPORTED_MODULE_0__model_DocNode__["a" /* default */]('192.168.0.13', 5555)];

function getAllNodes() {
  return docNodes;
}



/***/ }),

/***/ "./src/app.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Starting point of our project
 *
 */
const createError = __webpack_require__("http-errors");
const express = __webpack_require__("express");
const cookieParser = __webpack_require__("cookie-parser");
const logger = __webpack_require__("morgan");
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Routes section, load routes:
 *  - containers
 *  - volumes
 */
const docNodesRouter = __webpack_require__("./src/routes/api/docNodes.js");

app.use('/api/v' + process.env.npm_package_version + '/nodes', docNodesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(err.status || 500);
  res.json({
    code: err.status || 500,
    message: process.env.NODE_ENV !== 'development' ? 'Internal server error' : err.message
  });
});

module.exports = app;

/***/ }),

/***/ "./src/bin/index.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

const app = __webpack_require__("./src/app.js");
const debug = __webpack_require__("debug")('helloworld:server');
const http = __webpack_require__("http");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);

    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/***/ }),

/***/ "./src/controllers/baseController.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return successResponse; });
/* unused harmony export errorResponse */
/** Base controllers module, containing methods usefull for all controllers
 * @module Controllers/baseController
 */

/**
 * Return a generic success response
 * @param {Object} res - the response object to use to send the error
 * @param {Object} response - a generic json object to return as response body
 */
const successResponse = (res, response) => {
  res.status(200).json(response);
};

/**
 * Return a generic error response
 * @param {Object} res - the response object to use to send the error
 * @param {string} code - the code of the error
 * @param {string} message - the message of the error
 * module:Controllers/baseController~errorResponse
 */
const errorResponse = (res, code, message) => {
  res.status(code).json({
    code,
    message
  });
};



/***/ }),

/***/ "./src/controllers/docNodesController.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllNodeList", function() { return getAllNodeList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Plugins_DocNodesFinder_staticCode__ = __webpack_require__("./src/Plugins/DocNodesFinder/staticCode.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_controllers_baseController__ = __webpack_require__("./src/controllers/baseController.js");



const getConfiguredPlugins = () => {
  return [__WEBPACK_IMPORTED_MODULE_0_Plugins_DocNodesFinder_staticCode__];
};

const getAllNodeList = (req, res, next) => {
  const nodes = [];
  getConfiguredPlugins().map(plugin => plugin.getAllNodes().map(node => nodes.push(node)));
  __WEBPACK_IMPORTED_MODULE_1_controllers_baseController__["a" /* successResponse */](res, { nodes });
};



/***/ }),

/***/ "./src/model/DocNode.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DocNode {
  /**
     * Create a Doc Node reference
     * @param ip {String}
     * @param port {int}
     */
  constructor(ip, port) {
    this.ip = ip;
    this.port = port;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DocNode);

/***/ }),

/***/ "./src/routes/api/docNodes.js":
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__("express");
const docNodesController = __webpack_require__("./src/controllers/docNodesController.js");
const router = new express.Router();

/**
 * @route   GET api/<version>/nodes/list
 * @desc    Return a list of active nodes
 * @access  Private
 */
router.get('/list', docNodesController.getAllNodeList);

module.exports = router;

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./src/bin/index.js");
module.exports = __webpack_require__("./node_modules/webpack/hot/poll.js?1000");


/***/ }),

/***/ "cookie-parser":
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "debug":
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "http-errors":
/***/ (function(module, exports) {

module.exports = require("http-errors");

/***/ }),

/***/ "morgan":
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIDI5N2Y5OWExYzNkZTE0NGEzYTZiIiwiL1VzZXJzL2FsZXNzYW5kcm9zdGFmZm9sYW5pL1dvcmtzcGFjZS9MQVZPUk8vSW1vbGFJbmZvcm1hdGljYS9kZWxvcmVhbi9kZWxvcmVhblVwL0JhY2tlbmQvbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy1hcHBseS1yZXN1bHQuanMiLCIvVXNlcnMvYWxlc3NhbmRyb3N0YWZmb2xhbmkvV29ya3NwYWNlL0xBVk9STy9JbW9sYUluZm9ybWF0aWNhL2RlbG9yZWFuL2RlbG9yZWFuVXAvQmFja2VuZC9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzIiwiL1VzZXJzL2FsZXNzYW5kcm9zdGFmZm9sYW5pL1dvcmtzcGFjZS9MQVZPUk8vSW1vbGFJbmZvcm1hdGljYS9kZWxvcmVhbi9kZWxvcmVhblVwL0JhY2tlbmQvbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L3BvbGwuanM/MTAwMCIsIi9Vc2Vycy9hbGVzc2FuZHJvc3RhZmZvbGFuaS9Xb3Jrc3BhY2UvTEFWT1JPL0ltb2xhSW5mb3JtYXRpY2EvZGVsb3JlYW4vZGVsb3JlYW5VcC9CYWNrZW5kL3NyYy9QbHVnaW5zL0RvY05vZGVzRmluZGVyL3N0YXRpY0NvZGUuanMiLCIvVXNlcnMvYWxlc3NhbmRyb3N0YWZmb2xhbmkvV29ya3NwYWNlL0xBVk9STy9JbW9sYUluZm9ybWF0aWNhL2RlbG9yZWFuL2RlbG9yZWFuVXAvQmFja2VuZC9zcmMvYXBwLmpzIiwiL1VzZXJzL2FsZXNzYW5kcm9zdGFmZm9sYW5pL1dvcmtzcGFjZS9MQVZPUk8vSW1vbGFJbmZvcm1hdGljYS9kZWxvcmVhbi9kZWxvcmVhblVwL0JhY2tlbmQvc3JjL2Jpbi9pbmRleC5qcyIsIi9Vc2Vycy9hbGVzc2FuZHJvc3RhZmZvbGFuaS9Xb3Jrc3BhY2UvTEFWT1JPL0ltb2xhSW5mb3JtYXRpY2EvZGVsb3JlYW4vZGVsb3JlYW5VcC9CYWNrZW5kL3NyYy9jb250cm9sbGVycy9iYXNlQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9hbGVzc2FuZHJvc3RhZmZvbGFuaS9Xb3Jrc3BhY2UvTEFWT1JPL0ltb2xhSW5mb3JtYXRpY2EvZGVsb3JlYW4vZGVsb3JlYW5VcC9CYWNrZW5kL3NyYy9jb250cm9sbGVycy9kb2NOb2Rlc0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvYWxlc3NhbmRyb3N0YWZmb2xhbmkvV29ya3NwYWNlL0xBVk9STy9JbW9sYUluZm9ybWF0aWNhL2RlbG9yZWFuL2RlbG9yZWFuVXAvQmFja2VuZC9zcmMvbW9kZWwvRG9jTm9kZS5qcyIsIi9Vc2Vycy9hbGVzc2FuZHJvc3RhZmZvbGFuaS9Xb3Jrc3BhY2UvTEFWT1JPL0ltb2xhSW5mb3JtYXRpY2EvZGVsb3JlYW4vZGVsb3JlYW5VcC9CYWNrZW5kL3NyYy9yb3V0ZXMvYXBpL2RvY05vZGVzLmpzIiwiZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJleHRlcm5hbCBcImRlYnVnXCIiLCJleHRlcm5hbCBcImV4cHJlc3NcIiIsImV4dGVybmFsIFwiaHR0cFwiIiwiZXh0ZXJuYWwgXCJodHRwLWVycm9yc1wiIiwiZXh0ZXJuYWwgXCJtb3JnYW5cIiJdLCJuYW1lcyI6WyJkb2NOb2RlcyIsIkRvY05vZGUiLCJnZXRBbGxOb2RlcyIsImNyZWF0ZUVycm9yIiwicmVxdWlyZSIsImV4cHJlc3MiLCJjb29raWVQYXJzZXIiLCJsb2dnZXIiLCJhcHAiLCJ1c2UiLCJqc29uIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwiZG9jTm9kZXNSb3V0ZXIiLCJwcm9jZXNzIiwiZW52IiwibnBtX3BhY2thZ2VfdmVyc2lvbiIsInJlcSIsInJlcyIsIm5leHQiLCJlcnIiLCJOT0RFX0VOViIsImNvbnNvbGUiLCJsb2ciLCJzZXRIZWFkZXIiLCJzdGF0dXMiLCJjb2RlIiwibWVzc2FnZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWJ1ZyIsImh0dHAiLCJwb3J0Iiwibm9ybWFsaXplUG9ydCIsIlBPUlQiLCJzZXQiLCJzZXJ2ZXIiLCJjcmVhdGVTZXJ2ZXIiLCJsaXN0ZW4iLCJvbiIsIm9uRXJyb3IiLCJvbkxpc3RlbmluZyIsInZhbCIsInBhcnNlSW50IiwiaXNOYU4iLCJlcnJvciIsInN5c2NhbGwiLCJiaW5kIiwiZXhpdCIsImFkZHIiLCJhZGRyZXNzIiwic3VjY2Vzc1Jlc3BvbnNlIiwicmVzcG9uc2UiLCJlcnJvclJlc3BvbnNlIiwiZ2V0Q29uZmlndXJlZFBsdWdpbnMiLCJzdGF0aWNDb2RlIiwiZ2V0QWxsTm9kZUxpc3QiLCJub2RlcyIsIm1hcCIsInBsdWdpbiIsIm5vZGUiLCJwdXNoIiwiYmFzZUNvbnRyb2xsZXIiLCJjb25zdHJ1Y3RvciIsImlwIiwiZG9jTm9kZXNDb250cm9sbGVyIiwicm91dGVyIiwiUm91dGVyIiwiZ2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBLG9EQUE0QztBQUM1QztBQUNBO0FBQ0E7O0FBRUEsMENBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkNBQXFDO0FBQ3JDO0FBQ0E7Ozs7QUFJQTtBQUNBLHNEQUE4QztBQUM5QztBQUNBO0FBQ0Esb0NBQTRCO0FBQzVCLHFDQUE2QjtBQUM3Qix5Q0FBaUM7O0FBRWpDLCtDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBc0M7QUFDdEM7QUFDQTtBQUNBLHFDQUE2QjtBQUM3QixxQ0FBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQWlCLDhCQUE4QjtBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUEsNERBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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UixDQUEzQjtBQUNBLE1BQU04RCxTQUFTLElBQUk3RCxRQUFROEQsTUFBWixFQUFmOztBQUVBOzs7OztBQUtBRCxPQUFPRSxHQUFQLENBQVcsT0FBWCxFQUFvQkgsbUJBQW1CVCxjQUF2Qzs7QUFFQTVCLE9BQU9DLE9BQVAsR0FBaUJxQyxNQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7O0FDWEEsMEM7Ozs7Ozs7QUNBQSxrQzs7Ozs7OztBQ0FBLG9DOzs7Ozs7O0FDQUEsaUM7Ozs7Ozs7QUNBQSx3Qzs7Ozs7OztBQ0FBLG1DIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgY2h1bmsgPSByZXF1aXJlKFwiLi9cIiArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIik7XHJcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmsuaWQsIGNodW5rLm1vZHVsZXMpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dHJ5IHtcclxuIFx0XHRcdHZhciB1cGRhdGUgPSByZXF1aXJlKFwiLi9cIiArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiKTtcclxuIFx0XHR9IGNhdGNoKGUpIHtcclxuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuIFx0XHR9XHJcbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh1cGRhdGUpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkgeyAvL2VzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xyXG4gXHR9XHJcblxuIFx0XHJcbiBcdFxyXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XHJcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMjk3Zjk5YTFjM2RlMTQ0YTNhNmJcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcclxuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XHJcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRpZighbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xyXG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcclxuIFx0XHRcdGlmKG1lLmhvdC5hY3RpdmUpIHtcclxuIFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xyXG4gXHRcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA8IDApXHJcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA8IDApXHJcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcclxuIFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlcXVlc3QgKyBcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgKyBtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcclxuIFx0XHR9O1xyXG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XHJcbiBcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XHJcbiBcdFx0XHRcdH0sXHJcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH07XHJcbiBcdFx0fTtcclxuIFx0XHRmb3IodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XHJcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicmVhZHlcIilcclxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcclxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcclxuIFx0XHRcdFx0dGhyb3cgZXJyO1xyXG4gXHRcdFx0fSk7XHJcbiBcdFxyXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xyXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XHJcbiBcdFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcclxuIFx0XHRcdFx0XHRpZighaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcclxuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9O1xyXG4gXHRcdHJldHVybiBmbjtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgaG90ID0ge1xyXG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxyXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXHJcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcclxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXHJcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcclxuIFx0XHJcbiBcdFx0XHQvLyBNb2R1bGUgQVBJXHJcbiBcdFx0XHRhY3RpdmU6IHRydWUsXHJcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XHJcbiBcdFx0XHRcdGVsc2VcclxuIFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHJcbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxyXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxyXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxyXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdGlmKCFsKSByZXR1cm4gaG90U3RhdHVzO1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxyXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXHJcbiBcdFx0fTtcclxuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XHJcbiBcdFx0cmV0dXJuIGhvdDtcclxuIFx0fVxyXG4gXHRcclxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XHJcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcclxuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcclxuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdERlZmVycmVkO1xyXG4gXHRcclxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXHJcbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XHJcbiBcdFx0dmFyIGlzTnVtYmVyID0gKCtpZCkgKyBcIlwiID09PSBpZDtcclxuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcclxuIFx0XHRpZihob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcclxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XHJcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XHJcbiBcdFx0XHRpZighdXBkYXRlKSB7XHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XHJcbiBcdFx0XHRcdHJldHVybiBudWxsO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcclxuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcclxuIFx0XHJcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XHJcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcclxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxyXG4gXHRcdFx0XHR9O1xyXG4gXHRcdFx0fSk7XHJcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcclxuIFx0XHRcdHZhciBjaHVua0lkID0gMDtcclxuIFx0XHRcdHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sb25lLWJsb2Nrc1xyXG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xyXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcclxuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRpZighaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxyXG4gXHRcdFx0cmV0dXJuO1xyXG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFx0aWYoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xyXG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xyXG4gXHRcdGlmKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XHJcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcclxuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcclxuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XHJcbiBcdFx0aWYoIWRlZmVycmVkKSByZXR1cm47XHJcbiBcdFx0aWYoaG90QXBwbHlPblVwZGF0ZSkge1xyXG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cclxuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxyXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxyXG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbigpIHtcclxuIFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xyXG4gXHRcdFx0fSkudGhlbihcclxuIFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiBcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG4gXHRcdFx0XHR9LFxyXG4gXHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcclxuIFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0KTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdFx0Zm9yKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcclxuIFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XHJcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XHJcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpIHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcclxuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuIFx0XHJcbiBcdFx0dmFyIGNiO1xyXG4gXHRcdHZhciBpO1xyXG4gXHRcdHZhciBqO1xyXG4gXHRcdHZhciBtb2R1bGU7XHJcbiBcdFx0dmFyIG1vZHVsZUlkO1xyXG4gXHRcclxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcclxuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4gXHRcclxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xyXG4gXHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxyXG4gXHRcdFx0XHRcdGlkOiBpZFxyXG4gXHRcdFx0XHR9O1xyXG4gXHRcdFx0fSk7XHJcbiBcdFx0XHR3aGlsZShxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xyXG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XHJcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZighbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZClcclxuIFx0XHRcdFx0XHRjb250aW51ZTtcclxuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxyXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxyXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXHJcbiBcdFx0XHRcdFx0fTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihtb2R1bGUuaG90Ll9tYWluKSB7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxyXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxyXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXHJcbiBcdFx0XHRcdFx0fTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcclxuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0aWYoIXBhcmVudCkgY29udGludWU7XHJcbiBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXHJcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXHJcbiBcdFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZihvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgPj0gMCkgY29udGludWU7XHJcbiBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XHJcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XHJcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxyXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXHJcbiBcdFx0XHRcdFx0fSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHJcbiBcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXHJcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcclxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXHJcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xyXG4gXHRcdFx0fTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcclxuIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcclxuIFx0XHRcdFx0aWYoYS5pbmRleE9mKGl0ZW0pIDwgMClcclxuIFx0XHRcdFx0XHRhLnB1c2goaXRlbSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxyXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cclxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcclxuIFx0XHJcbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcclxuIFx0XHRcdGNvbnNvbGUud2FybihcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIik7XHJcbiBcdFx0fTtcclxuIFx0XHJcbiBcdFx0Zm9yKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xyXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xyXG4gXHRcdFx0XHRpZihob3RVcGRhdGVbaWRdKSB7XHJcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xyXG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxyXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXHJcbiBcdFx0XHRcdFx0fTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xyXG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xyXG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XHJcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xyXG4gXHRcdFx0XHRpZihyZXN1bHQuY2hhaW4pIHtcclxuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0c3dpdGNoKHJlc3VsdC50eXBlKSB7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25EZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkRlY2xpbmVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxyXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIgaW4gXCIgKyByZXN1bHQucGFyZW50SWQgKyBjaGFpbkluZm8pO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25VbmFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm8pO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25EaXNwb3NlZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcclxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYoYWJvcnRFcnJvcikge1xyXG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xyXG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihkb0FwcGx5KSB7XHJcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdFx0XHRcdFx0Zm9yKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4gXHRcdFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXHJcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XHJcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSwgcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKGRvRGlzcG9zZSkge1xyXG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXHJcbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdGZvcihpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XHJcbiBcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZClcclxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xyXG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxyXG4gXHRcdFx0XHR9KTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XHJcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xyXG4gXHRcdFx0aWYoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XHJcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9KTtcclxuIFx0XHJcbiBcdFx0dmFyIGlkeDtcclxuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcclxuIFx0XHR3aGlsZShxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xyXG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRpZighbW9kdWxlKSBjb250aW51ZTtcclxuIFx0XHJcbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xyXG4gXHRcclxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xyXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcclxuIFx0XHRcdGZvcihqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcclxuIFx0XHRcdFx0Y2IoZGF0YSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xyXG4gXHRcclxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXHJcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xyXG4gXHRcclxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxyXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcclxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFxyXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cclxuIFx0XHRcdGZvcihqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XHJcbiBcdFx0XHRcdGlmKCFjaGlsZCkgY29udGludWU7XHJcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSB7XHJcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cclxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcclxuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XHJcbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYobW9kdWxlKSB7XHJcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0Zm9yKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcclxuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xyXG4gXHRcdFx0XHRcdFx0aWYoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcclxuIFx0XHJcbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcclxuIFx0XHRmb3IobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcclxuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xyXG4gXHRcdGZvcihtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGlmKG1vZHVsZSkge1xyXG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcclxuIFx0XHRcdFx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xyXG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcclxuIFx0XHRcdFx0XHRcdGlmKGNiKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGlmKGNhbGxiYWNrcy5pbmRleE9mKGNiKSA+PSAwKSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRmb3IoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gXHRcdFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xyXG4gXHRcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcclxuIFx0XHRmb3IoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcclxuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcclxuIFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xyXG4gXHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuIFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcclxuIFx0XHRcdFx0XHR9IGNhdGNoKGVycjIpIHtcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcclxuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcclxuIFx0XHRcdFx0XHRcdFx0XHRvcmdpbmFsRXJyb3I6IGVyciwgLy8gVE9ETyByZW1vdmUgaW4gd2VicGFjayA0XHJcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXHJcbiBcdFx0XHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnIyO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcclxuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxyXG4gXHRcdFx0XHRcdFx0fSk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxyXG4gXHRcdGlmKGVycm9yKSB7XHJcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xyXG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XHJcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHR9KTtcclxuIFx0fVxyXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyOTdmOTlhMWMzZGUxNDRhM2E2YiIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXBkYXRlZE1vZHVsZXMsIHJlbmV3ZWRNb2R1bGVzKSB7XHJcblx0dmFyIHVuYWNjZXB0ZWRNb2R1bGVzID0gdXBkYXRlZE1vZHVsZXMuZmlsdGVyKGZ1bmN0aW9uKG1vZHVsZUlkKSB7XHJcblx0XHRyZXR1cm4gcmVuZXdlZE1vZHVsZXMgJiYgcmVuZXdlZE1vZHVsZXMuaW5kZXhPZihtb2R1bGVJZCkgPCAwO1xyXG5cdH0pO1xyXG5cdHZhciBsb2cgPSByZXF1aXJlKFwiLi9sb2dcIik7XHJcblxyXG5cdGlmKHVuYWNjZXB0ZWRNb2R1bGVzLmxlbmd0aCA+IDApIHtcclxuXHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBUaGUgZm9sbG93aW5nIG1vZHVsZXMgY291bGRuJ3QgYmUgaG90IHVwZGF0ZWQ6IChUaGV5IHdvdWxkIG5lZWQgYSBmdWxsIHJlbG9hZCEpXCIpO1xyXG5cdFx0dW5hY2NlcHRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xyXG5cdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGlmKCFyZW5ld2VkTW9kdWxlcyB8fCByZW5ld2VkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcclxuXHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBOb3RoaW5nIGhvdCB1cGRhdGVkLlwiKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIFVwZGF0ZWQgbW9kdWxlczpcIik7XHJcblx0XHRyZW5ld2VkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uKG1vZHVsZUlkKSB7XHJcblx0XHRcdGlmKHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJzdHJpbmdcIiAmJiBtb2R1bGVJZC5pbmRleE9mKFwiIVwiKSAhPT0gLTEpIHtcclxuXHRcdFx0XHR2YXIgcGFydHMgPSBtb2R1bGVJZC5zcGxpdChcIiFcIik7XHJcblx0XHRcdFx0bG9nLmdyb3VwQ29sbGFwc2VkKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgcGFydHMucG9wKCkpO1xyXG5cdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcclxuXHRcdFx0XHRsb2cuZ3JvdXBFbmQoXCJpbmZvXCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR2YXIgbnVtYmVySWRzID0gcmVuZXdlZE1vZHVsZXMuZXZlcnkoZnVuY3Rpb24obW9kdWxlSWQpIHtcclxuXHRcdFx0cmV0dXJuIHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJudW1iZXJcIjtcclxuXHRcdH0pO1xyXG5cdFx0aWYobnVtYmVySWRzKVxyXG5cdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gQ29uc2lkZXIgdXNpbmcgdGhlIE5hbWVkTW9kdWxlc1BsdWdpbiBmb3IgbW9kdWxlIG5hbWVzLlwiKTtcclxuXHR9XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9ob3QvbG9nLWFwcGx5LXJlc3VsdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLWFwcGx5LXJlc3VsdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbG9nTGV2ZWwgPSBcImluZm9cIjtcclxuXHJcbmZ1bmN0aW9uIGR1bW15KCkge31cclxuXHJcbmZ1bmN0aW9uIHNob3VsZExvZyhsZXZlbCkge1xyXG5cdHZhciBzaG91bGRMb2cgPSAobG9nTGV2ZWwgPT09IFwiaW5mb1wiICYmIGxldmVsID09PSBcImluZm9cIikgfHxcclxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiXS5pbmRleE9mKGxvZ0xldmVsKSA+PSAwICYmIGxldmVsID09PSBcIndhcm5pbmdcIikgfHxcclxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiLCBcImVycm9yXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwiZXJyb3JcIik7XHJcblx0cmV0dXJuIHNob3VsZExvZztcclxufVxyXG5cclxuZnVuY3Rpb24gbG9nR3JvdXAobG9nRm4pIHtcclxuXHRyZXR1cm4gZnVuY3Rpb24obGV2ZWwsIG1zZykge1xyXG5cdFx0aWYoc2hvdWxkTG9nKGxldmVsKSkge1xyXG5cdFx0XHRsb2dGbihtc2cpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGV2ZWwsIG1zZykge1xyXG5cdGlmKHNob3VsZExvZyhsZXZlbCkpIHtcclxuXHRcdGlmKGxldmVsID09PSBcImluZm9cIikge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhtc2cpO1xyXG5cdFx0fSBlbHNlIGlmKGxldmVsID09PSBcIndhcm5pbmdcIikge1xyXG5cdFx0XHRjb25zb2xlLndhcm4obXNnKTtcclxuXHRcdH0gZWxzZSBpZihsZXZlbCA9PT0gXCJlcnJvclwiKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IobXNnKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG52YXIgZ3JvdXAgPSBjb25zb2xlLmdyb3VwIHx8IGR1bW15O1xyXG52YXIgZ3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkIHx8IGR1bW15O1xyXG52YXIgZ3JvdXBFbmQgPSBjb25zb2xlLmdyb3VwRW5kIHx8IGR1bW15O1xyXG5cclxubW9kdWxlLmV4cG9ydHMuZ3JvdXAgPSBsb2dHcm91cChncm91cCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ncm91cENvbGxhcHNlZCA9IGxvZ0dyb3VwKGdyb3VwQ29sbGFwc2VkKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLmdyb3VwRW5kID0gbG9nR3JvdXAoZ3JvdXBFbmQpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMuc2V0TG9nTGV2ZWwgPSBmdW5jdGlvbihsZXZlbCkge1xyXG5cdGxvZ0xldmVsID0gbGV2ZWw7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9ob3QvbG9nLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2cuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLypnbG9iYWxzIF9fcmVzb3VyY2VRdWVyeSAqL1xyXG5pZihtb2R1bGUuaG90KSB7XHJcblx0dmFyIGhvdFBvbGxJbnRlcnZhbCA9ICsoX19yZXNvdXJjZVF1ZXJ5LnN1YnN0cigxKSkgfHwgKDEwICogNjAgKiAxMDAwKTtcclxuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xyXG5cclxuXHR2YXIgY2hlY2tGb3JVcGRhdGUgPSBmdW5jdGlvbiBjaGVja0ZvclVwZGF0ZShmcm9tVXBkYXRlKSB7XHJcblx0XHRpZihtb2R1bGUuaG90LnN0YXR1cygpID09PSBcImlkbGVcIikge1xyXG5cdFx0XHRtb2R1bGUuaG90LmNoZWNrKHRydWUpLnRoZW4oZnVuY3Rpb24odXBkYXRlZE1vZHVsZXMpIHtcclxuXHRcdFx0XHRpZighdXBkYXRlZE1vZHVsZXMpIHtcclxuXHRcdFx0XHRcdGlmKGZyb21VcGRhdGUpIGxvZyhcImluZm9cIiwgXCJbSE1SXSBVcGRhdGUgYXBwbGllZC5cIik7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlcXVpcmUoXCIuL2xvZy1hcHBseS1yZXN1bHRcIikodXBkYXRlZE1vZHVsZXMsIHVwZGF0ZWRNb2R1bGVzKTtcclxuXHRcdFx0XHRjaGVja0ZvclVwZGF0ZSh0cnVlKTtcclxuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcblx0XHRcdFx0dmFyIHN0YXR1cyA9IG1vZHVsZS5ob3Quc3RhdHVzKCk7XHJcblx0XHRcdFx0aWYoW1wiYWJvcnRcIiwgXCJmYWlsXCJdLmluZGV4T2Yoc3RhdHVzKSA+PSAwKSB7XHJcblx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gQ2Fubm90IGFwcGx5IHVwZGF0ZS5cIik7XHJcblx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gXCIgKyBlcnIuc3RhY2sgfHwgZXJyLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFlvdSBuZWVkIHRvIHJlc3RhcnQgdGhlIGFwcGxpY2F0aW9uIVwiKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFVwZGF0ZSBmYWlsZWQ6IFwiICsgZXJyLnN0YWNrIHx8IGVyci5tZXNzYWdlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblx0c2V0SW50ZXJ2YWwoY2hlY2tGb3JVcGRhdGUsIGhvdFBvbGxJbnRlcnZhbCk7XHJcbn0gZWxzZSB7XHJcblx0dGhyb3cgbmV3IEVycm9yKFwiW0hNUl0gSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBkaXNhYmxlZC5cIik7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2hvdC9wb2xsLmpzPzEwMDBcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L3BvbGwuanM/MTAwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRG9jTm9kZSBmcm9tICcuLi8uLi9tb2RlbC9Eb2NOb2RlJ1xuXG5jb25zdCBkb2NOb2RlcyA9IFtcbiAgbmV3IERvY05vZGUoJzEyNy4wLjAuMScsIDU1NTUpLFxuICBuZXcgRG9jTm9kZSgnMTkyLjE2OC4wLjEzJywgNTU1NSlcbl1cblxuZnVuY3Rpb24gZ2V0QWxsTm9kZXMgKCkge1xuICByZXR1cm4gZG9jTm9kZXNcbn1cblxuZXhwb3J0IHsgZ2V0QWxsTm9kZXMgfVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1BsdWdpbnMvRG9jTm9kZXNGaW5kZXIvc3RhdGljQ29kZS5qcyIsIi8qKlxuICogU3RhcnRpbmcgcG9pbnQgb2Ygb3VyIHByb2plY3RcbiAqXG4gKi9cbmNvbnN0IGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnaHR0cC1lcnJvcnMnKVxuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKVxuY29uc3QgY29va2llUGFyc2VyID0gcmVxdWlyZSgnY29va2llLXBhcnNlcicpXG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCdtb3JnYW4nKVxuY29uc3QgYXBwID0gZXhwcmVzcygpXG5cbmFwcC51c2UobG9nZ2VyKCdkZXYnKSlcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpXG5hcHAudXNlKGV4cHJlc3MudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSlcbmFwcC51c2UoY29va2llUGFyc2VyKCkpXG5cbi8qKlxuICogUm91dGVzIHNlY3Rpb24sIGxvYWQgcm91dGVzOlxuICogIC0gY29udGFpbmVyc1xuICogIC0gdm9sdW1lc1xuICovXG5jb25zdCBkb2NOb2Rlc1JvdXRlciA9IHJlcXVpcmUoJ3JvdXRlcy9hcGkvZG9jTm9kZXMnKVxuXG5hcHAudXNlKCcvYXBpL3YnICsgcHJvY2Vzcy5lbnYubnBtX3BhY2thZ2VfdmVyc2lvbiArICcvbm9kZXMnLCBkb2NOb2Rlc1JvdXRlcilcblxuLy8gY2F0Y2ggNDA0IGFuZCBmb3J3YXJkIHRvIGVycm9yIGhhbmRsZXJcbmFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4gIG5leHQoY3JlYXRlRXJyb3IoNDA0KSlcbn0pXG5cbi8vIGVycm9yIGhhbmRsZXJcbmFwcC51c2UoZnVuY3Rpb24gKGVyciwgcmVxLCByZXMpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgY29uc29sZS5sb2coZXJyKVxuICB9XG4gIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJylcbiAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMClcbiAgcmVzLmpzb24oe1xuICAgIGNvZGU6IGVyci5zdGF0dXMgfHwgNTAwLFxuICAgIG1lc3NhZ2U6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAnZGV2ZWxvcG1lbnQnID8gJ0ludGVybmFsIHNlcnZlciBlcnJvcicgOiBlcnIubWVzc2FnZVxuICB9KVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBhcHBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAuanMiLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuY29uc3QgYXBwID0gcmVxdWlyZSgnYXBwJylcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnaGVsbG93b3JsZDpzZXJ2ZXInKVxuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKVxuXG4vKipcbiAqIEdldCBwb3J0IGZyb20gZW52aXJvbm1lbnQgYW5kIHN0b3JlIGluIEV4cHJlc3MuXG4gKi9cblxuY29uc3QgcG9ydCA9IG5vcm1hbGl6ZVBvcnQocHJvY2Vzcy5lbnYuUE9SVCB8fCAnMzAwMCcpXG5hcHAuc2V0KCdwb3J0JywgcG9ydClcblxuLyoqXG4gKiBDcmVhdGUgSFRUUCBzZXJ2ZXIuXG4gKi9cblxuY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKVxuXG4vKipcbiAqIExpc3RlbiBvbiBwcm92aWRlZCBwb3J0LCBvbiBhbGwgbmV0d29yayBpbnRlcmZhY2VzLlxuICovXG5cbnNlcnZlci5saXN0ZW4ocG9ydClcbnNlcnZlci5vbignZXJyb3InLCBvbkVycm9yKVxuc2VydmVyLm9uKCdsaXN0ZW5pbmcnLCBvbkxpc3RlbmluZylcblxuLyoqXG4gKiBOb3JtYWxpemUgYSBwb3J0IGludG8gYSBudW1iZXIsIHN0cmluZywgb3IgZmFsc2UuXG4gKi9cblxuZnVuY3Rpb24gbm9ybWFsaXplUG9ydCAodmFsKSB7XG4gIGNvbnN0IHBvcnQgPSBwYXJzZUludCh2YWwsIDEwKVxuXG4gIGlmIChpc05hTihwb3J0KSkge1xuICAgIC8vIG5hbWVkIHBpcGVcbiAgICByZXR1cm4gdmFsXG4gIH1cblxuICBpZiAocG9ydCA+PSAwKSB7XG4gICAgLy8gcG9ydCBudW1iZXJcbiAgICByZXR1cm4gcG9ydFxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogRXZlbnQgbGlzdGVuZXIgZm9yIEhUVFAgc2VydmVyIFwiZXJyb3JcIiBldmVudC5cbiAqL1xuXG5mdW5jdGlvbiBvbkVycm9yIChlcnJvcikge1xuICBpZiAoZXJyb3Iuc3lzY2FsbCAhPT0gJ2xpc3RlbicpIHtcbiAgICB0aHJvdyBlcnJvclxuICB9XG5cbiAgY29uc3QgYmluZCA9IHR5cGVvZiBwb3J0ID09PSAnc3RyaW5nJ1xuICAgID8gJ1BpcGUgJyArIHBvcnRcbiAgICA6ICdQb3J0ICcgKyBwb3J0XG5cbiAgLy8gaGFuZGxlIHNwZWNpZmljIGxpc3RlbiBlcnJvcnMgd2l0aCBmcmllbmRseSBtZXNzYWdlc1xuICBzd2l0Y2ggKGVycm9yLmNvZGUpIHtcbiAgICBjYXNlICdFQUNDRVMnOlxuICAgICAgY29uc29sZS5lcnJvcihiaW5kICsgJyByZXF1aXJlcyBlbGV2YXRlZCBwcml2aWxlZ2VzJylcbiAgICAgIHByb2Nlc3MuZXhpdCgxKVxuXG4gICAgY2FzZSAnRUFERFJJTlVTRSc6XG4gICAgICBjb25zb2xlLmVycm9yKGJpbmQgKyAnIGlzIGFscmVhZHkgaW4gdXNlJylcbiAgICAgIHByb2Nlc3MuZXhpdCgxKVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IGVycm9yXG4gIH1cbn1cblxuLyoqXG4gKiBFdmVudCBsaXN0ZW5lciBmb3IgSFRUUCBzZXJ2ZXIgXCJsaXN0ZW5pbmdcIiBldmVudC5cbiAqL1xuXG5mdW5jdGlvbiBvbkxpc3RlbmluZyAoKSB7XG4gIGNvbnN0IGFkZHIgPSBzZXJ2ZXIuYWRkcmVzcygpXG4gIGNvbnN0IGJpbmQgPSB0eXBlb2YgYWRkciA9PT0gJ3N0cmluZydcbiAgICA/ICdwaXBlICcgKyBhZGRyXG4gICAgOiAncG9ydCAnICsgYWRkci5wb3J0XG4gIGRlYnVnKCdMaXN0ZW5pbmcgb24gJyArIGJpbmQpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmluL2luZGV4LmpzIiwiLyoqIEJhc2UgY29udHJvbGxlcnMgbW9kdWxlLCBjb250YWluaW5nIG1ldGhvZHMgdXNlZnVsbCBmb3IgYWxsIGNvbnRyb2xsZXJzXG4gKiBAbW9kdWxlIENvbnRyb2xsZXJzL2Jhc2VDb250cm9sbGVyXG4gKi9cblxuLyoqXG4gKiBSZXR1cm4gYSBnZW5lcmljIHN1Y2Nlc3MgcmVzcG9uc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSB0aGUgcmVzcG9uc2Ugb2JqZWN0IHRvIHVzZSB0byBzZW5kIHRoZSBlcnJvclxuICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlIC0gYSBnZW5lcmljIGpzb24gb2JqZWN0IHRvIHJldHVybiBhcyByZXNwb25zZSBib2R5XG4gKi9cbmNvbnN0IHN1Y2Nlc3NSZXNwb25zZSA9IChyZXMsIHJlc3BvbnNlKSA9PiB7XG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3BvbnNlKVxufVxuXG4vKipcbiAqIFJldHVybiBhIGdlbmVyaWMgZXJyb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXMgLSB0aGUgcmVzcG9uc2Ugb2JqZWN0IHRvIHVzZSB0byBzZW5kIHRoZSBlcnJvclxuICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSB0aGUgY29kZSBvZiB0aGUgZXJyb3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIG1lc3NhZ2Ugb2YgdGhlIGVycm9yXG4gKiBtb2R1bGU6Q29udHJvbGxlcnMvYmFzZUNvbnRyb2xsZXJ+ZXJyb3JSZXNwb25zZVxuICovXG5jb25zdCBlcnJvclJlc3BvbnNlID0gKHJlcywgY29kZSwgbWVzc2FnZSkgPT4ge1xuICByZXMuc3RhdHVzKGNvZGUpLmpzb24oe1xuICAgIGNvZGUsXG4gICAgbWVzc2FnZVxuICB9KVxufVxuXG5leHBvcnQge1xuICBzdWNjZXNzUmVzcG9uc2UsXG4gIGVycm9yUmVzcG9uc2Vcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250cm9sbGVycy9iYXNlQ29udHJvbGxlci5qcyIsImltcG9ydCAqIGFzIHN0YXRpY0NvZGUgZnJvbSAnUGx1Z2lucy9Eb2NOb2Rlc0ZpbmRlci9zdGF0aWNDb2RlJ1xuaW1wb3J0ICogYXMgYmFzZUNvbnRyb2xsZXIgZnJvbSAnY29udHJvbGxlcnMvYmFzZUNvbnRyb2xsZXInXG5cbmNvbnN0IGdldENvbmZpZ3VyZWRQbHVnaW5zID0gKCkgPT4ge1xuICByZXR1cm4gW3N0YXRpY0NvZGVdXG59XG5cbmNvbnN0IGdldEFsbE5vZGVMaXN0ID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGNvbnN0IG5vZGVzID0gW11cbiAgZ2V0Q29uZmlndXJlZFBsdWdpbnMoKS5tYXAocGx1Z2luID0+IHBsdWdpbi5nZXRBbGxOb2RlcygpLm1hcChub2RlID0+IG5vZGVzLnB1c2gobm9kZSkpKVxuICBiYXNlQ29udHJvbGxlci5zdWNjZXNzUmVzcG9uc2UocmVzLCB7IG5vZGVzIH0pXG59XG5cbmV4cG9ydCB7XG4gIGdldEFsbE5vZGVMaXN0XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udHJvbGxlcnMvZG9jTm9kZXNDb250cm9sbGVyLmpzIiwiY2xhc3MgRG9jTm9kZSB7XG4gIC8qKlxuICAgICAqIENyZWF0ZSBhIERvYyBOb2RlIHJlZmVyZW5jZVxuICAgICAqIEBwYXJhbSBpcCB7U3RyaW5nfVxuICAgICAqIEBwYXJhbSBwb3J0IHtpbnR9XG4gICAgICovXG4gIGNvbnN0cnVjdG9yIChpcCwgcG9ydCkge1xuICAgIHRoaXMuaXAgPSBpcFxuICAgIHRoaXMucG9ydCA9IHBvcnRcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb2NOb2RlXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWwvRG9jTm9kZS5qcyIsImNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJylcbmNvbnN0IGRvY05vZGVzQ29udHJvbGxlciA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL2RvY05vZGVzQ29udHJvbGxlcicpXG5jb25zdCByb3V0ZXIgPSBuZXcgZXhwcmVzcy5Sb3V0ZXIoKVxuXG4vKipcbiAqIEByb3V0ZSAgIEdFVCBhcGkvPHZlcnNpb24+L25vZGVzL2xpc3RcbiAqIEBkZXNjICAgIFJldHVybiBhIGxpc3Qgb2YgYWN0aXZlIG5vZGVzXG4gKiBAYWNjZXNzICBQcml2YXRlXG4gKi9cbnJvdXRlci5nZXQoJy9saXN0JywgZG9jTm9kZXNDb250cm9sbGVyLmdldEFsbE5vZGVMaXN0KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JvdXRlcy9hcGkvZG9jTm9kZXMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29va2llLXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSBjb29raWUtcGFyc2VyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRlYnVnXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZGVidWdcIlxuLy8gbW9kdWxlIGlkID0gZGVidWdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3NcIlxuLy8gbW9kdWxlIGlkID0gZXhwcmVzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaHR0cFwiXG4vLyBtb2R1bGUgaWQgPSBodHRwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHAtZXJyb3JzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaHR0cC1lcnJvcnNcIlxuLy8gbW9kdWxlIGlkID0gaHR0cC1lcnJvcnNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9yZ2FuXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9yZ2FuXCJcbi8vIG1vZHVsZSBpZCA9IG1vcmdhblxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9